import { VaultType } from "../../basic-vault/types";
import type { StrikePricesGroup, TypeGroup } from "../types";

export const typeGroups: TypeGroup[] = [
  {
    [VaultType.CALL]: "L-TN-CSCCv1-BNBUSD",
    [VaultType.PUT]: "L-TN-CSCPv1-BNBUSD-A",
  },
];

export const strikePricesGroups: StrikePricesGroup[] = [
  ["L-TN-CSCCv1-MATICUSD-A", "L-TN-CSCCv1-MATICUSD-B"],
];
