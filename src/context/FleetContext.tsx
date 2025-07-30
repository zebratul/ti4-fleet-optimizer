import { createContext, useContext, useState,  } from "react";
import type { ReactNode } from "react";

export type Constraints = {
  resources: number;
  fleetSupply: number;
  production: number;
  upgrades: Record<string, boolean>;
  spacedock: boolean;
  selectedFaction: string;      // ← new
};

const defaultConstraints: Constraints = {
  resources: 6,
  fleetSupply: 3,
  production: 5,
  upgrades: {
    fighter: false,
    destroyer: false,
    cruiser: false,
    carrier: false,
  },
  spacedock: false,
  selectedFaction: "None",     // ← default
};

const FleetContext = createContext<{
  constraints: Constraints;
  setConstraints: React.Dispatch<React.SetStateAction<Constraints>>;
} | null>(null);

export const useFleetContext = () => {
  const ctx = useContext(FleetContext);
  if (!ctx) throw new Error("useFleetContext must be used inside FleetProvider");
  return ctx;
};

export const FleetProvider = ({ children }: { children: ReactNode }) => {
  const [constraints, setConstraints] = useState(defaultConstraints);

  return (
    <FleetContext.Provider value={{ constraints, setConstraints }}>
      {children}
    </FleetContext.Provider>
  );
};
