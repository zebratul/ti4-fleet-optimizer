import DeepSeekAdvice from "../components/DeepSeekAdvice";

export default function AdvicePage() {
  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>TI4 Strategic Advisor</h2>
      <DeepSeekAdvice />
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center" as const,
    width: "100%",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1.5rem",
    textAlign: "center" as const,
  },
};
