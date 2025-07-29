import "./index.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import OptimizePage from "./routes/OptimizePage";
import AdvicePage from "./routes/AdvicePage";

export default function App() {
  const location = useLocation();
  return (
    <div className="container">
      <nav>
        <Link to="/optimize" className={location.pathname === "/optimize" ? "active" : ""}>
          Optimize Fleet
        </Link>
        <Link to="/advice" className={location.pathname === "/advice" ? "active" : ""}>
          Get TI4 Advice
        </Link>
      </nav>

      <Routes>
        <Route path="/optimize" element={<OptimizePage />} />
        <Route path="/advice" element={<AdvicePage />} />
        <Route path="*" element={<OptimizePage />} />
      </Routes>
    </div>
  );
}
