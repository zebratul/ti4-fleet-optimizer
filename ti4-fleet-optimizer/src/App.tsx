import { Routes, Route, Link, useLocation } from "react-router-dom";
import OptimizePage from "./routes/OptimizePage";
import AdvicePage from "./routes/AdvicePage";

function App() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <Link to="/optimize" style={{ ...styles.tab, ...(isActive("/optimize") ? styles.activeTab : {}) }}>
          Optimize Fleet
        </Link>
        <Link to="/advice" style={{ ...styles.tab, ...(isActive("/advice") ? styles.activeTab : {}) }}>
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

const styles = {
  app: {
    fontFamily: "'Rubik', sans-serif",
    backgroundColor: "#121212",
    color: "#f0f0f0",
    minHeight: "100vh",
    padding: "2rem 0",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center" as const,
  },
  nav: {
    display: "flex",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  tab: {
    padding: "0.75rem 2rem",
    borderRadius: "2rem",
    backgroundColor: "#1e1e1e",
    color: "#ccc",
    textDecoration: "none",
    fontSize: "1.2rem",
    transition: "0.3s",
  },
  activeTab: {
    backgroundColor: "#333",
    color: "#fff",
    fontWeight: "bold",
  },
};

export default App;
