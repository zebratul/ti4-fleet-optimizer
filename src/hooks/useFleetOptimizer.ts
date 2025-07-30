import { useFleetContext } from "../context/FleetContext";
import { SHIP_DATA } from "../data/ships";
import type { ShipType, ShipStats } from "../data/ships";
import { FACTION_UNITS } from "../data/factionUnits";
import { useMemo } from "react";

export type FleetResult = {
  build: { ship: string; count: number }[];
  totalHits: number;
  totalAFB: number;
  totalDurability: number;
};

export default function useFleetOptimizer(trigger = false): FleetResult {
  const { constraints } = useFleetContext();

  return useMemo(() => {
    const { resources, production, fleetSupply, upgrades, spacedock, selectedFaction } = constraints;

    // 1) Build generic ships with tech upgrades
    const baseShips = (Object.keys(SHIP_DATA) as ShipType[]).map((type) => {
      const base = SHIP_DATA[type];
      const applied = upgrades[type] && base.upgraded
        ? { ...base, ...base.upgraded }
        : base;
      return {
        key: type,
        stats: {
          ...applied,
          dice: base.dice,
          type: base.type,
        } as ShipStats,
      };
    });

    // 2) Build faction uniques, also supporting tech upgrades if defined
    const uniqueShips = (FACTION_UNITS[selectedFaction] || []).map(({ key, stats: base }) => {
      // tech upgrade if user checked the generic upgrade for this "type"
      const techUpgraded = upgrades[base.type] && base.upgraded
        ? { ...base, ...base.upgraded }
        : base;
      return {
        key,
        stats: {
          ...techUpgraded,
          dice: base.dice,
          type: base.type,
        } as ShipStats,
      };
    });

    // 3) Filter out any base ship whose type is overridden by a unique
    const overriddenTypes = new Set(uniqueShips.map((u) => u.stats.type));
    const filteredBase = baseShips.filter((b) => !overriddenTypes.has(b.stats.type));

    // 4) Combine & sort by capacity
    const ships = [...filteredBase, ...uniqueShips].sort((a, b) => b.stats.cap - a.stats.cap);

    let best = { build: [] as FleetResult["build"], totalHits: 0, totalAFB: 0, totalDurability: 0 };

    const dfs = (
      idx: number,
      remProd: number,
      remRes: number,
      remFS: number,
      remCap: number,
      current: Partial<Record<string, number>>
    ) => {
      if (idx === ships.length || remProd === 0) {
        // evaluate…
        let hits = 0, afb = 0, hp = 0;
        for (const { key, stats } of ships) {
          const cnt = current[key] ?? 0;
          if (!cnt) continue;
          hits += cnt * stats.dice * (11 - stats.combat) / 10;
          if (stats.afb) afb += cnt * stats.afb.dice * (11 - stats.afb.combat) / 10;
          hp += cnt * stats.hitPoints;
        }
        if (hits > best.totalHits) {
          best = {
            build: Object.entries(current).filter(([, c]) => c! > 0)
                              .map(([ship, c]) => ({ ship, count: c! })),
            totalHits: hits,
            totalAFB: afb,
            totalDurability: hp,
          };
        }
        return;
      }

      const { key, stats } = ships[idx];
      const maxByProd = remProd;
      const maxByRes  = Math.floor(remRes / stats.cost);
      const maxByFS   = stats.fs > 0 ? Math.floor(remFS / stats.fs) : Infinity;
      const maxByCap  = stats.cap < 0 ? Math.floor(remCap / -stats.cap) : Infinity;
      const maxCount  = Math.min(maxByProd, maxByRes, maxByFS, maxByCap);

      for (let cnt = 0; cnt <= maxCount; cnt++) {
        current[key] = cnt;
        dfs(idx + 1,
            remProd - cnt,
            remRes  - cnt * stats.cost,
            remFS   - cnt * stats.fs,
            remCap  + cnt * stats.cap,
            current
        );
      }
      delete current[key];
    };

    dfs(0, production, resources, fleetSupply, spacedock ? 3 : 0, {});
    return best;
  }, [constraints, trigger]);
}
