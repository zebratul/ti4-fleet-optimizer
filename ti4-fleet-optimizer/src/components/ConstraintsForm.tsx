import { useFleetContext } from "../context/FleetContext";
import { SHIP_DATA } from "../data/ships";
import { FACTION_UNITS } from "../data/factionUnits";

export default function ConstraintsForm({ onCalculate }: { onCalculate: () => void }) {
  const { constraints, setConstraints } = useFleetContext();

  // handle numeric inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConstraints(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  // handle faction select
  const handleFaction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConstraints(prev => ({ ...prev, selectedFaction: e.target.value }));
  };

  // toggles
  const toggleUpgrade = (ship: string) =>
    setConstraints(prev => ({
      ...prev,
      upgrades: { ...prev.upgrades, [ship]: !prev.upgrades[ship] },
    }));

  const toggleSpacedock = () =>
    setConstraints(prev => ({ ...prev, spacedock: !prev.spacedock }));

  return (
    <div style={styles.form}>
      <h2 style={styles.heading}>Build Constraints</h2>

      <div style={styles.fieldRow}>
        {["resources", "fleetSupply", "production"].map((field) => (
          <label key={field} style={styles.label}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              type="number"
              name={field}
              value={(constraints as any)[field]}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
        ))}
      </div>

      <div style={styles.section}>
        <h3 style={styles.subheading}>Select Faction</h3>
        <select
          value={constraints.selectedFaction}
          onChange={handleFaction}
          style={styles.select}
        >
          <option value="None">None</option>
          {Object.keys(FACTION_UNITS).map((fac) => (
            <option key={fac} value={fac}>{fac}</option>
          ))}
        </select>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subheading}>Unit Upgrades</h3>
        {Object.entries(constraints.upgrades).map(([ship, on]) => (
          <label key={ship} style={styles.checkbox}>
            <input type="checkbox" checked={on} onChange={() => toggleUpgrade(ship)} />
            {SHIP_DATA[ship as keyof typeof SHIP_DATA].name}
          </label>
        ))}
      </div>

      <div style={styles.section}>
        <label style={styles.checkbox}>
          <input type="checkbox" checked={constraints.spacedock} onChange={toggleSpacedock} />
          Building at a Spacedock (+3 fighter capacity)
        </label>
      </div>

      <button onClick={onCalculate} style={styles.button}>
        Calculate
      </button>
    </div>
  );
}

const styles = {
  form: {
    width: "80%",
    backgroundColor: "#1a1a1a",
    padding: "2rem",
    borderRadius: "1.5rem",
    boxShadow: "0 0 15px rgba(0,0,0,0.7)",
    marginBottom: "2rem",
    textAlign: "center" as const,
  },
  heading: { fontSize: "2rem", marginBottom: "1.5rem" },
  subheading: { fontSize: "1.5rem", marginBottom: "1rem" },
  fieldRow: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "1.5rem",
  },
  label: { fontSize: "1.25rem" },
  input: {
    marginLeft: "0.5rem",
    fontSize: "1.25rem",
    padding: "0.5rem",
    width: "80px",
    borderRadius: "0.5rem",
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #555",
  },
  section: { marginBottom: "1.5rem" },
  checkbox: {
    fontSize: "1.2rem",
    marginRight: "1.5rem",
  },
    select: {
    marginLeft: "0.5rem",
    fontSize: "1.25rem",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #555",
    minWidth: "200px",
  },
  button: {
    fontSize: "1.4rem",
    padding: "0.75rem 2rem",
    borderRadius: "2rem",
    backgroundColor: "#3f51b5",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};
