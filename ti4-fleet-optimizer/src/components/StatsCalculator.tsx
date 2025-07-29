// src/components/StatsCalculator.tsx
import { useState, useMemo } from "react";
import { SHIP_DATA } from "../data/ships";
import type { ShipType } from "../data/ships";
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

  const toggleUpgrade = (key: string) => {
    console.log('upgraded');
    
    setUpgraded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 1) Build default list
  const defaultList = useMemo(
    () =>
      (Object.keys(SHIP_DATA) as ShipType[]).map((k) => ({
        key: k,
        stats: SHIP_DATA[k],
      })),
    []
  );

  // 2) Build unique list
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

  // 3) Filter defaults by unique.stats.type
  const overriddenTypes = useMemo(
    () => new Set(uniqueList.map((u) => u.stats.type)),
    [uniqueList]
  );

  // 4) Final shipList, sorted by cost ascending
  const shipList = useMemo(() => {
    const combined = [
      ...defaultList.filter((d) => !overriddenTypes.has(d.stats.type)),
      ...uniqueList,
    ];
    return combined.sort((a, b) => a.stats.cost - b.stats.cost);
  }, [defaultList, overriddenTypes, uniqueList]);

  // initial counts
  const makeZeroCounts = () =>
    Object.fromEntries(shipList.map((s) => [s.key, 0])) as Record<string, number>;

  const [counts, setCounts] = useState<Record<string, number>>(makeZeroCounts);

  // reset whenever faction (and thus shipList) changes
  useMemo(() => {
    setCounts(makeZeroCounts());
  }, [shipList.join(",")]); // re-run when shipList keys change

  const handleCount = (key: string, v: number) => {
    setCounts((prev) => ({ ...prev, [key]: Math.max(0, v) }));
  };

  // calculate stats
  const result = useMemo(() => {
    return shipList.reduce(
      (acc, { key, stats }) => {
        const c = counts[key] || 0;
        if (!c) return acc;
        acc.hits += c * stats.dice * (11 - stats.combat) / 10;
        if (stats.afb) acc.afb += c * stats.afb.dice * (11 - stats.afb.combat) / 10;
        acc.hp += c * stats.hitPoints;
        return acc;
      },
      { hits: 0, afb: 0, hp: 0 }
    );
  }, [counts, shipList]);

  return (
    <>
      {/* Faction selector */}
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
            <img src={FACTION_ICONS[fac]} alt={fac} width={32} height={32} decoding="async" />
            <span>{fac}</span>
          </div>
        ))}
      </div>

      {/* Ship counts */}
      <h3>Enter Your Ships</h3>
      <div className="upgrade-grid">
        {shipList.map(({ key, stats }) => {
        const cnt = counts[key] || 0;
        return (
            <CountCard
            key={key}
            icon={SHIP_ICONS[stats.type]}
            name={stats.name}
            count={cnt}
            isUpgraded={!!upgraded[key]}
            onIncrement={() => handleCount(key, cnt + 1)}
            onDecrement={() => handleCount(key, Math.max(0, cnt - 1))}
            onToggleUpgrade={() => toggleUpgrade(key)}
            />
        );
        })}
      </div>

      {/* Reset & (no explicit calculate, updates live) */}
      <button onClick={() => setCounts(makeZeroCounts())}>Reset Fleet</button>

      {/* Results */}
      <div className="results">
        <div className="left">
          <p><strong>Avg Hits:</strong> {result.hits.toFixed(2)} 💥</p>
          <p><strong>AFB Hits:</strong> {result.afb.toFixed(2)} 🔥</p>
          <p><strong>Durability:</strong> {result.hp} 🛡️</p>
        </div>
      </div>
    </>
  );
}
