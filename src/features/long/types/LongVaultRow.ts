import type { LongVaultReader } from "../../long-vault/types";
import type { BasicVault } from "../../basic-vault/types";

export interface LongVaultRow
  extends BasicVault,
    Pick<LongVaultReader, "totalPosition"> {}
