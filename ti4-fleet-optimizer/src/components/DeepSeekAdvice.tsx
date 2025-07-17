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
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>TI4 Strategic Advisor</h2>

      <textarea
        style={styles.textarea}
        placeholder="Describe your goal..."
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        required
      />

      <input
        style={styles.input}
        placeholder="Enemy factions (comma‑separated)"
        value={enemies}
        onChange={(e) => setEnemies(e.target.value)}
      />

      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? "Asking..." : "Get Advice"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {advice && (
        <div style={styles.adviceBox}>
          <h3>Advice</h3>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{advice}</ReactMarkdown>
        </div>
      )}
    </form>
  );
}

const styles = {
  form: {
    width: "80%",
    maxWidth: "600px",
    backgroundColor: "#1a1a1a",
    padding: "2rem",
    borderRadius: "1rem",
    textAlign: "center" as const,
    boxShadow: "0 0 10px rgba(0,0,0,0.6)",
  },
  heading: { fontSize: "1.8rem", marginBottom: "1rem" },
  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "0.75rem",
    fontSize: "1.1rem",
    borderRadius: "0.5rem",
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #555",
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1.1rem",
    borderRadius: "0.5rem",
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #555",
    marginBottom: "1rem",
  },
  button: {
    padding: "0.75rem 2rem",
    fontSize: "1.2rem",
    borderRadius: "2rem",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginBottom: "1rem",
  },
  error: { color: "#f44336", marginTop: "0.5rem" },
  adviceBox: {
    marginTop: "1.5rem",
    textAlign: "left" as const,
    backgroundColor: "#222",
    padding: "1rem",
    borderRadius: "0.75rem",
  },
};
