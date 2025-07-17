import { useState, useCallback } from "react";

export function useDeepSeek() {
  const [advice, setAdvice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAdvice = useCallback(
    async (goal: string, enemies: string[]) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("https://openrouter.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat-v3-0324:free",
            messages: [
              { role: "system", content: "You are a strategic advisor for a tabletop game Twilight Imperium, 4th edition. Based on the user prompt, provide short advice on how to counter-play your enemies." },
              { role: "user", content: `Goal: ${goal}\nEnemies: ${enemies.join(", ")}` },
            ],
            temperature: 0.7,
            max_tokens: 200,
          }),
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const json = await res.json();
        const msg = json.choices?.[0]?.message?.content;
        if (typeof msg === "string") {
          setAdvice(msg.trim());
        } else {
          setError("Unexpected API response format.");
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { advice, getAdvice, loading, error };
}
