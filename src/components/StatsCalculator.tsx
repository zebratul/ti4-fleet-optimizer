import { useState, useMemo, useEffect } from "react";
import type { ShipType, ShipStats } from "../data/ships";
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

const SHIP_ICONS: Record<ShipType, string> = {
  fighter: fighterIcon,
  destroyer: destroyerIcon,
  cruiser: cruiserIcon,
  carrier: carrierIcon,
  dreadnought: dreadnoughtIcon,
  flagship: flagshipIcon,
  warsun: warsunIcon,
};

export default function StatsCalculator() {
  const [faction, setFaction] = useState<string>("None");
  const [upgraded, setUpgraded] = useState<Record<string, boolean>>({});

  const toggleUpgrade = (key: string) =>
    setUpgraded((prev) => ({ ...prev, [key]: !prev[key] }));

  // 1) Base ships list
  const defaultList = useMemo(
    () =>
      (Object.keys(SHIP_DATA) as ShipType[]).map((type) => ({
        key: type,
        stats: SHIP_DATA[type],
      })),
    []
  );

  // 2) Faction-unique units
  const uniqueList = useMemo(
    () =>
      faction !== "None"
        ? FACTION_UNITS[faction].map((u) => ({
            key: u.key,
            stats: u.stats,
          }))
        : [],
    [faction]
  );

  // 3) Remove base types overridden by uniques
  const overriddenTypes = useMemo(
    () => new Set(uniqueList.map((u) => u.stats.type)),
    [uniqueList]
  );

  // 4) Final ship list, sorted by ascending cost
  const shipList = useMemo(() => {
    const combined = [
      ...defaultList.filter((d) => !overriddenTypes.has(d.stats.type)),
      ...uniqueList,
    ];
    return combined.sort((a, b) => a.stats.cost - b.stats.cost);
  }, [defaultList, overriddenTypes, uniqueList]);

  const makeZeroCounts = () =>
    Object.fromEntries(shipList.map((s) => [s.key, 0])) as Record<string, number>;

  const [counts, setCounts] = useState<Record<string, number>>(makeZeroCounts);

  useEffect(() => {
    setCounts(makeZeroCounts());
    setUpgraded({});
  }, [shipList]);

  const handleIncrement = (key: string) =>
    setCounts((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
  const handleDecrement = (key: string) =>
    setCounts((prev) => ({ ...prev, [key]: Math.max(0, (prev[key] || 0) - 1) }));

  // Compute aggregated stats with upgrades applied
  const result = useMemo(() => {
    return shipList.reduce(
      (acc, { key, stats: base }) => {
        const qty = counts[key] || 0;
        if (!qty) return acc;

        // Determine effective stats: apply upgrade if toggled and an `upgraded` field exists
        const eff: ShipStats = upgraded[key] && base.upgraded
          ? {
              ...base,
              ...base.upgraded,
              dice: base.dice,
              afb: base.upgraded.afb ?? base.afb,
            }
          : base;

        acc.hits += qty * eff.dice * (11 - eff.combat) / 10;

        if (eff.afb) {
          acc.afb += qty * eff.afb.dice * (11 - eff.afb.combat) / 10;
        }

        acc.hp += qty * eff.hitPoints;
        if (eff.sustainDamage) {
          acc.hp += qty;
        }
        return acc;
      },
      { hits: 0, afb: 0, hp: 0 }
    );
  }, [counts, shipList, upgraded]);

  return (
    <>
      <h3>Select Faction</h3>
      <div className="faction-grid">
        <div
          className={`faction-card ${faction === "None" ? "selected" : ""}`}
          onClick={() => setFaction("None")}
        >
          <span>None</span>
        </div>
        {Object.keys(FACTION_UNITS).map((fac) => (
          <div
            key={fac}
            className={`faction-card ${faction === fac ? "selected" : ""}`}
            onClick={() => setFaction(fac)}
          >
            <img
              src={FACTION_ICONS[fac]}
              alt={fac}
              width={32}
              height={32}
              decoding="async"
            />
            <span>{fac}</span>
          </div>
        ))}
      </div>

      <h3>
        Enter Fleet &nbsp;
        <small>(click arrow to adjust, click icon to toggle upgrade)</small>
      </h3>
      <div className="upgrade-grid">
        {shipList.map(({ key, stats }) => (
          <CountCard
            key={key}
            icon={SHIP_ICONS[stats.type]}
            name={stats.name}
            count={counts[key] || 0}
            isUpgraded={!!upgraded[key]}
            onIncrement={() => handleIncrement(key)}
            onDecrement={() => handleDecrement(key)}
            onToggleUpgrade={() => toggleUpgrade(key)}
          />
        ))}
      </div>

      <button onClick={() => { setCounts(makeZeroCounts()); setUpgraded({}); }}>
        Reset Fleet
      </button>

      <div className="results">
        <div className="left">
          <p>
            <strong>Avg Hits / Round:</strong> {result.hits.toFixed(2)} 💥
          </p>
          <p>
            <strong>AFB Hits:</strong> {result.afb.toFixed(2)} 🔥
          </p>
          <p>
            <strong>Durability:</strong> {result.hp} 🛡️
          </p>
        </div>
      </div>
    </>
  );
}
