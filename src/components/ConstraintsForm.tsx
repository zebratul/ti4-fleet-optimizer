import { useFleetContext } from "../context/FleetContext";
import { SHIP_DATA } from "../data/ships";
import { FACTION_UNITS } from "../data/factionUnits";
import { FACTION_ICONS } from "../data/icons";

import CountCard from "./CountCard";

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

export default function ConstraintsForm({ onCalculate }: { onCalculate(): void }) {
  const { constraints, setConstraints } = useFleetContext();
  const { resources, fleetSupply, production, upgrades, spacedock, selectedFaction } = constraints;

  const changeConstraint = (key: "resources" | "fleetSupply" | "production", delta: number) => {
    setConstraints((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const handleFaction = (f: string) => setConstraints((p) => ({ ...p, selectedFaction: f }));
  const toggleUpgrade = (ship: string) => setConstraints((p) => ({
    ...p,
    upgrades: { ...p.upgrades, [ship]: !p.upgrades[ship] },
  }));
  const toggleSpacedock = () => setConstraints((p) => ({ ...p, spacedock: !p.spacedock }));

  return (
    <div className="card">
      <h2>Build Constraints</h2>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem", justifyContent: "space-evenly" }}>
        <CountCard
          name="Resources"
          count={resources}
          onIncrement={() => changeConstraint("resources", +1)}
          onDecrement={() => changeConstraint("resources", -1)}
          isUpgraded={false}
          onToggleUpgrade={() => {}}
        />
        <CountCard
          name="Fleet Supply"
          count={fleetSupply}
          onIncrement={() => changeConstraint("fleetSupply", +1)}
          onDecrement={() => changeConstraint("fleetSupply", -1)}
          isUpgraded={false}
          onToggleUpgrade={() => {}}
        />
        <CountCard
          name="Production"
          count={production}
          onIncrement={() => changeConstraint("production", +1)}
          onDecrement={() => changeConstraint("production", -1)}
          isUpgraded={false}
          onToggleUpgrade={() => {}}
        />
      </div>

      <h3>Select Faction</h3>
      <div className="faction-grid">
        <div
          className={`faction-card ${selectedFaction === "None" ? "selected" : ""}`}
          onClick={() => handleFaction("None")}
        >
          None
        </div>
        {Object.keys(FACTION_UNITS).map((fac) => (
          <div
            key={fac}
            className={`faction-card ${selectedFaction === fac ? "selected" : ""}`}
            onClick={() => handleFaction(fac)}
          >
            <img src={FACTION_ICONS[fac]} alt={fac} width={32} height={32} decoding="async" />
            {fac}
          </div>
        ))}
      </div>

      <h3>Unit Tech Upgrades</h3>
      <div className="faction-grid">
        {Object.entries(upgrades).map(([ship, on]) => {
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
              {base.name}
            </div>
          );
        })}
      </div>

      <h3>Spacedock</h3>
      <div className="faction-grid">
        <div
          className={`faction-card ${spacedock ? "selected" : ""}`}
          onClick={toggleSpacedock}
        >
          +3 Fighter Capacity
        </div>
      </div>

      <button onClick={onCalculate}>Calculate</button>
    </div>
  );
}
