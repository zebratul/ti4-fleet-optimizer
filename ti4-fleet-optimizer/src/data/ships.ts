export type ShipType =
  | "fighter"
  | "destroyer"
  | "cruiser"
  | "carrier"
  | "dreadnought"
  | "flagship"
  | "warsun";

export type ShipStats = {
  name: string;
  fs: number;
  cap: number;
  cost: number;
  combat: number;
  dice: number;
  upgraded?: Partial<Omit<ShipStats, "upgraded">>;
};

export const SHIP_DATA: Record<ShipType, ShipStats> = {
  fighter: { name: "Fighter", fs: 0, cap: -1, cost: 0.5, combat: 9, dice: 1, upgraded: { combat: 8 } },
  destroyer: { name: "Destroyer", fs: 1, cap: 0, cost: 1, combat: 9, dice: 1, upgraded: { combat: 8 } },
  cruiser: { name: "Cruiser", fs: 1, cap: 0, cost: 2, combat: 7, dice: 1, upgraded: { combat: 6, cap: 1 } },
  carrier: { name: "Carrier", fs: 1, cap: 4, cost: 3, combat: 9, dice: 1, upgraded: { cap: 6 } },
  dreadnought: { name: "Dreadnought", fs: 1, cap: 1, cost: 4, combat: 5, dice: 1 },
  flagship: { name: "Flagship", fs: 1, cap: 4, cost: 8, combat: 6, dice: 2 },
  warsun: { name: "WarSun", fs: 1, cap: 6, cost: 12, combat: 3, dice: 3 },
};
