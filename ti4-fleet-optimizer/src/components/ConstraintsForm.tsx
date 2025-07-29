import { useFleetContext } from "../context/FleetContext";
import { SHIP_DATA } from "../data/ships";
import { FACTION_UNITS } from "../data/factionUnits";
import { FACTION_ICONS } from "../data/icons";

import fighterIcon from "../assets/fighter.png?inline";
import destroyerIcon from "../assets/destroyer.png?inline";
import cruiserIcon from "../assets/cruiser.png?inline";
import carrierIcon from "../assets/carrier.png?inline";
import dreadnoughtIcon from "../assets/dreadnought.png?inline";
import flagshipIcon from "../assets/flagship.png?inline";
import warsunIcon from "../assets/warsun.png?inline";

const SHIP_ICONS: Record<string, string> = {
  fighter: fighterIcon,
  destroyer: destroyerIcon,
  cruiser: cruiserIcon,
  carrier: carrierIcon,
  dreadnought: dreadnoughtIcon,
  flagship: flagshipIcon,
  warsun: warsunIcon,
};

export default function ConstraintsForm({ onCalculate }: { onCalculate: () => void }) {
  const { constraints, setConstraints } = useFleetContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConstraints(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleFaction = (f: string) =>
    setConstraints(prev => ({ ...prev, selectedFaction: f }));

  const toggleUpgrade = (ship: string) =>
    setConstraints(prev => ({
      ...prev,
      upgrades: { ...prev.upgrades, [ship]: !prev.upgrades[ship] },
    }));

  const toggleSpacedock = () =>
    setConstraints(prev => ({ ...prev, spacedock: !prev.spacedock }));

  return (
    <div className="card">
      <h2>Build Constraints</h2>

      {/* Numeric inputs */}
      {["resources", "fleetSupply", "production"].map((field) => (
        <label key={field}>
          {field.charAt(0).toUpperCase() + field.slice(1)}
          <input
            type="number"
            name={field}
            value={(constraints as any)[field]}
            onChange={handleChange}
          />
        </label>
      ))}

      {/* Faction selector */}
      <h3>Select Faction</h3>
      <div className="faction-grid">
        <div
          className={`faction-card ${constraints.selectedFaction === "None" ? "selected" : ""}`}
          onClick={() => handleFaction("None")}
        >
          <span>None</span>
        </div>
        {Object.keys(FACTION_UNITS).map((fac) => (
          <div
            key={fac}
            className={`faction-card ${constraints.selectedFaction === fac ? "selected" : ""}`}
            onClick={() => handleFaction(fac)}
          >
            <img src={FACTION_ICONS[fac]} alt={fac} width={32} height={32} decoding="async" />
            <span>{fac}</span>
          </div>
        ))}
      </div>

      {/* Upgrades selector */}
      <h3>Unit Upgrades</h3>
      <div className="faction-grid">
        {Object.entries(constraints.upgrades).map(([ship, on]) => {
          const base = SHIP_DATA[ship as keyof typeof SHIP_DATA];
          return (
            <div
              key={ship}
              className={`faction-card ${on ? "selected" : ""}`}
              onClick={() => toggleUpgrade(ship)}
            >
              <img
                src={SHIP_ICONS[base.type]}
                alt={base.name}
                width={24}
                height={24}
                decoding="async"
              />
              <span>{base.name}</span>
            </div>
          );
        })}
      </div>

      {/* Spacedock selector */}
      <h3>Building at a Spacedock</h3>
      <div className="faction-grid">
        <div
          className={`faction-card ${constraints.spacedock ? "selected" : ""}`}
          onClick={toggleSpacedock}
        >
          <span>+3 Fighter Capacity</span>
        </div>
      </div>

      <button onClick={onCalculate}>Calculate</button>
    </div>
  );
}
