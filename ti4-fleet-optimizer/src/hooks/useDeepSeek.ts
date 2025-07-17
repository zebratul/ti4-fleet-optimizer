// src/hooks/useDeepSeek.ts
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
        const res = await fetch(
          "https://deepseek-free-2iej.onrender.com/api/deepseek",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ goal, enemies }),
          }
        );

        if (!res.ok) {
          throw new Error(`Proxy error: ${res.status}`);
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
