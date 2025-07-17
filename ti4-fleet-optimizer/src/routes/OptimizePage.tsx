import { useState } from "react";
import ConstraintsForm from "../components/ConstraintsForm";
import OptimizationResults from "../components/OptimizationResults";

export default function OptimizePage() {
  const [calculate, setCalculate] = useState(false);

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Fleet Optimizer</h2>
      <ConstraintsForm onCalculate={() => setCalculate(true)} />
      <OptimizationResults trigger={calculate} onComplete={() => setCalculate(false)} />
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center" as const,
    width: "40%",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1.5rem",
    textAlign: "center" as const,
  },
};
