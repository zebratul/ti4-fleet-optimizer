import { useEffect, useState } from "react";
import useFleetOptimizer from "../hooks/useFleetOptimizer";
import type { FleetResult } from "../hooks/useFleetOptimizer";
import { useFleetContext } from "../context/FleetContext";

import { SHIP_DATA } from "../data/ships";
import { FACTION_UNITS } from "../data/factionUnits";

import fighterImg from "../assets/fighter.png?inline";
import destroyerImg from "../assets/destroyer.png?inline";
import cruiserImg from "../assets/cruiser.png?inline";
import carrierImg from "../assets/carrier.png?inline";
import dreadnoughtImg from "../assets/dreadnought.png?inline";
import flagshipImg from "../assets/flagship.png?inline";
import warsunImg from "../assets/warsun.png?inline";

type Props = { trigger: boolean; onComplete: () => void };

// Map base types to icons
const shipIcons: Record<string, string> = {
  fighter: fighterImg,
  destroyer: destroyerImg,
  cruiser: cruiserImg,
  carrier: carrierImg,
  dreadnought: dreadnoughtImg,
  flagship: flagshipImg,
  warsun: warsunImg,
};

export default function OptimizationResults({ trigger, onComplete }: Props) {
  const [ready, setReady] = useState(false);
  const { constraints } = useFleetContext();
  const { selectedFaction } = constraints;
  const result: FleetResult = useFleetOptimizer(trigger);

  // Build a lookup from ship key → ShipStats (so uniques and base both covered)
  const statsMap: Record<string, typeof SHIP_DATA["fighter"]> = {
    // base ships
    ...Object.fromEntries(
      (Object.keys(SHIP_DATA) as Array<keyof typeof SHIP_DATA>).map((key) => [
        key,
        SHIP_DATA[key],
      ])
    ),
    // faction uniques
    ...(FACTION_UNITS[selectedFaction] || []).reduce((acc, { key, stats }) => {
      acc[key] = stats;
      return acc;
    }, {} as Record<string, typeof SHIP_DATA["fighter"]>),
  };

  useEffect(() => {
    if (trigger) {
      setReady(true);
      onComplete();
    }
  }, [trigger]);

  if (!ready) return null;

  return (
    <div className="card">
      <h2>Optimal Fleet</h2>

      {result.build.length === 0 ? (
        <p>No viable fleet found.</p>
      ) : (
        <div className="results">
          <div className="left">
            {result.build.map(({ ship: key, count }) => {
              const stats = statsMap[key];
              const icon = shipIcons[stats.type];
              return (
                <div key={key} className="ship-row">
                  <img src={icon} alt={stats.type} width={40} height={40} decoding="async" />
                  <span>{count}× {stats.name}</span>
                </div>
              );
            })}
          </div>
          <div className="right">
            <p><strong>Avg Hits / Round:</strong> {result.totalHits.toFixed(2)} 💥</p>
            {result.totalAFB > 0 && (
              <p><strong>AFB Hits:</strong> {result.totalAFB.toFixed(2)} 🔥</p>
            )}
            <p><strong>Durability:</strong> {result.totalDurability} 🛡️</p>
          </div>
        </div>
      )}
    </div>
  );
}
