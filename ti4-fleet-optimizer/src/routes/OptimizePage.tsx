import { useState } from "react";
import ConstraintsForm from "../components/ConstraintsForm";
import OptimizationResults from "../components/OptimizationResults";

export default function OptimizePage() {
  const [calculate, setCalculate] = useState(false);

  return (
    <div>
      <h2>Fleet Optimizer</h2>
      <ConstraintsForm onCalculate={() => setCalculate(true)} />
      <OptimizationResults trigger={calculate} onComplete={() => setCalculate(false)} />
    </div>
  );
}
