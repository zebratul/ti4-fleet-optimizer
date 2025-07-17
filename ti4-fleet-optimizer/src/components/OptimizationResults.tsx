import { useEffect, useState } from "react";
import useFleetOptimizer from "../hooks/useFleetOptimizer";
import type { FleetResult } from "../hooks/useFleetOptimizer";

import fighterImg from "../assets/fighter.png";
import destroyerImg from "../assets/destroyer.png";
import cruiserImg from "../assets/cruiser.png";
import carrierImg from "../assets/carrier.png";
import dreadnoughtImg from "../assets/dreadnought.png";
import flagshipImg from "../assets/flagship.png";
import warsunImg from "../assets/warsun.png";

type Props = { trigger: boolean; onComplete: () => void };

// Map ShipType strings to the imported image modules
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
  const result: FleetResult = useFleetOptimizer(trigger);

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
            {result.build.map(({ ship, count }) => (
              <div key={ship} style={styles.shipRow}>
                <img
                  src={shipIcons[ship]}
                  alt={ship}
                  style={styles.icon}
                />
                <span style={styles.shipText}>
                  {count}× {ship.charAt(0).toUpperCase() + ship.slice(1)}
                </span>
              </div>
            ))}
          </div>
          <div style={styles.rightCol}>
            <p style={styles.hitsLabel}>Average Hits per Round</p>
            <p style={styles.hitsValue}>{result.totalHits.toFixed(2)}</p>
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
  hitsLabel: { fontSize: "1.25rem", marginBottom: "0.5rem" },
  hitsValue: { fontSize: "3rem", fontWeight: "bold" },
};
