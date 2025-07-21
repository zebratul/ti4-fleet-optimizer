export type ShipType =
  | "fighter"
  | "destroyer"
  | "cruiser"
  | "carrier"
  | "dreadnought"
  | "flagship"
  | "warsun";

export interface ShipStats {
  /** Display name, e.g. "Strike Wing Alpha I" or "Fighter" */
  name: string;

  /** Which base class this is (for icons, behavior) */
  type: ShipType;

  fs: number;              // fleet supply cost
  cap: number;             // capacity provided/consumed
  cost: number;            // resource cost
  combat: number;          // hit on ≥
  dice: number;            // number of attack dice
  upgraded?: Partial<Omit<ShipStats, "upgraded" | "name" | "type">>;

  afb?: {                  // anti‑fighter barrage
    dice: number;
    combat: number;
  };

  hitPoints: number;       // base HP
  sustainDamage: boolean;  // whether it has extra HP via sustain
}

export const SHIP_DATA: Record<ShipType, ShipStats> = {
  fighter: {
    name: "Fighter",
    type: "fighter",
    fs: 0,
    cap: -1,
    cost: 0.5,
    combat: 9,
    dice: 1,
    upgraded: { combat: 8 },
    hitPoints: 1,
    sustainDamage: false,
  },
  destroyer: {
    name: "Destroyer",
    type: "destroyer",
    fs: 1,
    cap: 0,
    cost: 1,
    combat: 9,
    dice: 1,
    afb: { dice: 2, combat: 9 },
    upgraded: {
      combat: 8,
      afb: { dice: 3, combat: 6 },
    },
    hitPoints: 1,
    sustainDamage: false,
  },
  cruiser: {
    name: "Cruiser",
    type: "cruiser",
    fs: 1,
    cap: 0,
    cost: 2,
    combat: 7,
    dice: 1,
    upgraded: { combat: 6, cap: 1 },
    hitPoints: 1,
    sustainDamage: false,
  },
  carrier: {
    name: "Carrier",
    type: "carrier",
    fs: 1,
    cap: 4,
    cost: 3,
    combat: 9,
    dice: 1,
    upgraded: { cap: 6 },
    hitPoints: 1,
    sustainDamage: false,
  },
  dreadnought: {
    name: "Dreadnought",
    type: "dreadnought",
    fs: 1,
    cap: 1,
    cost: 4,
    combat: 5,
    dice: 1,
    hitPoints: 2,
    sustainDamage: true,
  },
  flagship: {
    name: "Flagship",
    type: "flagship",
    fs: 1,
    cap: 4,
    cost: 8,
    combat: 6,
    dice: 2,
    hitPoints: 2,
    sustainDamage: true,
  },
  warsun: {
    name: "War Sun",
    type: "warsun",
    fs: 1,
    cap: 6,
    cost: 12,
    combat: 3,
    dice: 3,
    hitPoints: 2,
    sustainDamage: true,
  },
};
