// src/hooks/useFleetOptimizer.ts
import { useFleetContext } from "../context/FleetContext";
import { SHIP_DATA } from "../data/ships";
import type { ShipType, ShipStats } from "../data/ships";
import { useMemo } from "react";

export type FleetResult = {
  build: { ship: ShipType; count: number }[];
  totalHits: number;
};

export default function useFleetOptimizer(trigger: boolean = false): FleetResult {
  const { constraints } = useFleetContext();

  return useMemo(() => {
    const { resources, production, fleetSupply, upgrades, spacedock } = constraints;

    // 1) Build array of ship types with effective stats (applying upgrades)
    let ships: { type: ShipType; stats: ShipStats }[] = (
      Object.keys(SHIP_DATA) as ShipType[]
    ).map((type) => {
      const base = SHIP_DATA[type];
      const upgraded = upgrades[type] && base.upgraded
        ? { ...base, ...base.upgraded }
        : base;
      return {
        type,
        stats: {
          ...upgraded,
          dice: base.dice, // dice count never changes
        },
      };
    });

    // ─── Sort so capacity‑providers come first, fighters (cap < 0) last ──────────
    ships.sort((a, b) => b.stats.cap - a.stats.cap);

    let best: FleetResult = { build: [], totalHits: 0 };

    // 2) DFS/backtracking with pruning
    const dfs = (
      idx: number,
      remProd: number,
      remRes: number,
      remFS: number,
      remCap: number,
      current: Partial<Record<ShipType, number>>
    ) => {
      console.log('calculating');
      
      // If we've assigned all production or run out of types, evaluate
      if (idx === ships.length || remProd === 0) {
        let hits = 0;
        const build: FleetResult["build"] = [];

        for (const { type, stats } of ships) {
          const cnt = current[type] ?? 0;
          if (cnt > 0) {
            build.push({ ship: type, count: cnt });
            hits += cnt * stats.dice * (11 - stats.combat) / 10;
          }
        }

        if (hits > best.totalHits) {
          best = { build, totalHits: hits };
        }
        return;
      }

      const { type, stats } = ships[idx];

      // Compute max possible count by each constraint
      const maxByProd = remProd;
      const maxByRes = Math.floor(remRes / stats.cost);
      const maxByFS = stats.fs > 0 ? Math.floor(remFS / stats.fs) : Infinity;
      const maxByCap = stats.cap < 0
        ? Math.floor(remCap / (-stats.cap))
        : Infinity;

      const maxCount = Math.min(maxByProd, maxByRes, maxByFS, maxByCap);

      for (let cnt = 0; cnt <= maxCount; cnt++) {
        current[type] = cnt;
        dfs(
          idx + 1,
          remProd - cnt,
          remRes - cnt * stats.cost,
          remFS - cnt * stats.fs,
          remCap + cnt * stats.cap,
          current
        );
      }

      delete current[type];
    };

    const initialCap = spacedock ? 3 : 0;
    dfs(0, production, resources, fleetSupply, initialCap, {});

    return best;
  }, [constraints, trigger]);
}
