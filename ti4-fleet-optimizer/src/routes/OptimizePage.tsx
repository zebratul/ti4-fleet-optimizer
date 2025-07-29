// OptimizePage.tsx
import { useState } from "react";
import ConstraintsForm from "../components/ConstraintsForm";
import OptimizationResults from "../components/OptimizationResults";

export default function OptimizePage() {
  const [calculate, setCalculate] = useState(false);

  return (
    <>
      <OptimizationResults trigger={calculate} onComplete={() => setCalculate(false)} />
      <ConstraintsForm onCalculate={() => setCalculate(true)} />
    </>
  );
}
