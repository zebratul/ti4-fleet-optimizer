import { useState } from "react";
import { useDeepSeek } from "../hooks/useDeepSeek";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function DeepSeekAdvice() {
  const [goal, setGoal] = useState("");
  const [enemies, setEnemies] = useState("");
  const { advice, getAdvice, loading, error } = useDeepSeek();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getAdvice(goal, enemies.split(",").map((s) => s.trim()));
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Describe your goal..."
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        required
      />

      <input
        placeholder="Enemy factions (comma‑separated)"
        value={enemies}
        onChange={(e) => setEnemies(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Asking..." : "Get Advice"}
      </button>

      {error && <p>{error}</p>}

      {advice && (
        <div>
          <h3>Advice</h3>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{advice}</ReactMarkdown>
        </div>
      )}
    </form>
  );
}
