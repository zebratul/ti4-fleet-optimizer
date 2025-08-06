import { useMemo } from "react";
import { SHIP_DATA, type ShipType, type ShipStats } from "../data/ships";
import { FACTION_UNITS } from "../data/factionUnits";

export type FleetStats = {
  hits: number;
  afb: number;
  durability: number;
};

export function useFleetStats(
  faction: string,
  counts: Record<string, number>,
  upgraded: Record<string, boolean>
): FleetStats {
  return useMemo(() => {
    // 1) Build base + upgraded generic ships
    const baseShips = (Object.keys(SHIP_DATA) as ShipType[]).map((type) => {
      const base = SHIP_DATA[type];
      const tech = upgraded[type] && base.upgraded
        ? { ...base, ...base.upgraded }
        : base;
      return { key: type, stats: { ...tech, dice: base.dice, type: base.type } as ShipStats };
    });

    // 2) Faction uniques (with tech upgrades applied to their base.type)
    const unique = (FACTION_UNITS[faction] || []).map(({ key, stats: ubase }) => {
      const tech = upgraded[ubase.type] && ubase.upgraded
        ? { ...ubase, ...ubase.upgraded }
        : ubase;
      return { key, stats: { ...tech, dice: ubase.dice, type: ubase.type } as ShipStats };
    });

    // 3) Remove any base ship whose type is overridden by a unique
    const overridden = new Set(unique.map((u) => u.stats.type));
    const pool = [...baseShips.filter((b) => !overridden.has(b.stats.type)), ...unique];

    // 4) Fold through pool, summing up hits, afb and durability
    return pool.reduce(
      (acc, { key, stats }) => {
        const cnt = counts[key] || 0;
        if (!cnt) return acc;

        // combat
        acc.hits += cnt * stats.dice * (11 - stats.combat) / 10;

        // anti-fighter barrage
        if (stats.afb) {
          acc.afb += cnt * stats.afb.dice * (11 - stats.afb.combat) / 10;
        }

        // durability
        acc.durability += cnt * stats.hitPoints;
        if (stats.sustainDamage) acc.durability += cnt;

        return acc;
      },
      { hits: 0, afb: 0, durability: 0 }
    );
  }, [faction, counts, upgraded]);
}
