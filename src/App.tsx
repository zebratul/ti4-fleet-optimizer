import "./index.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import OptimizePage from "./routes/OptimizePage";
import AdvicePage from "./routes/AdvicePage";
import StatsPage from "./routes/StatsPage";

export default function App() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="container">
      <nav>
        <Link to="/optimize" className={isActive("/optimize") ? "active" : ""}>
          Optimize Fleet
        </Link>
        <Link to="/stats" className={isActive("/stats") ? "active" : ""}>
          Stats Calculator
        </Link>
        <Link to="/advice" className={isActive("/advice") ? "active" : ""}>
          Get TI4 Advice
        </Link>
      </nav>

      <Routes>
        <Route path="/optimize" element={<OptimizePage />} />
+       <Route path="/stats"    element={<StatsPage />} />
        <Route path="/advice"   element={<AdvicePage />} />
        <Route path="*"         element={<OptimizePage />} />
      </Routes>
    </div>
  );
}
