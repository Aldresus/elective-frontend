import { RoleEnum } from "@/entities/user";
import { createContext, useContext, useState } from "react";

export interface RoleContext {
  setRole: (role: RoleEnum) => void;
  role: RoleEnum | null;
}

const RoleContext = createContext<RoleContext | null>(null);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<RoleEnum>(RoleEnum.CLIENT);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useContext must be used within an RoleProvider");
  }
  return context;
}
