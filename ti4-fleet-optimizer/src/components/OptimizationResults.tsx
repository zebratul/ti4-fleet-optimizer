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
    <div style={styles.form}>
      <h2 style={styles.heading}>Optimal Fleet</h2>

      {result.build.length === 0 ? (
        <p style={styles.noResult}>No viable fleet found.</p>
      ) : (
        <div style={styles.columns}>
          <div style={styles.leftCol}>
            {result.build.map(({ ship: key, count }) => {
              const stats = statsMap[key];
              const type = stats?.type || "fighter"; // fallback
              const icon = shipIcons[type];

              return (
                <div key={key} style={styles.shipRow}>
                  <img src={icon} alt={type} style={styles.icon} />
                  <span style={styles.shipText}>
                    {count}× {stats.name}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={styles.rightCol}>
            <p style={styles.hitsLabel}>Average Hits per Round</p>
            <p style={styles.hitsValue}>{result.totalHits.toFixed(2)} 💥</p>

            {result.totalAFB > 0 && (
              <>
                <p style={styles.hitsLabel}>Avg Anti‑Fighter Barrage Hits</p>
                <p style={styles.hitsValue}>{result.totalAFB.toFixed(2)} 🔥</p>
              </>
            )}

            <p style={styles.hitsLabel}>Total Fleet Durability</p>
            <p style={styles.hitsValue}>{result.totalDurability} 🛡️</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  form: {
    width: "80%",
    maxWidth: "800px",
    backgroundColor: "#1a1a1a",
    padding: "2rem",
    borderRadius: "1.5rem",
    boxShadow: "0 0 15px rgba(0,0,0,0.7)",
    textAlign: "center" as const,
  },
  heading: { fontSize: "2rem", marginBottom: "1.5rem" },
  noResult: { fontSize: "1.25rem" },
  columns: {
    display: "flex",
    justifyContent: "space-between",
  },
  leftCol: { textAlign: "left" as const, flex: 1 },
  rightCol: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    gap: "1rem",
  },
  shipRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  icon: {
    width: "48px",
    height: "48px",
    marginRight: "1rem",
  },
  shipText: { fontSize: "1.3rem" },
  hitsLabel: { fontSize: "1.25rem", marginBottom: "0.25rem" },
  hitsValue: { fontSize: "2rem", fontWeight: "bold" },
};
