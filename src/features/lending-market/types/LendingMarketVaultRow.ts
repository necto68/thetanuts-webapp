import type { LendingMarketVaultReader } from "../../lending-market-vault/types";
import type { BasicVault } from "../../basic-vault/types";

export interface LendingMarketVaultRow
  extends BasicVault,
    Pick<LendingMarketVaultReader, "totalPosition"> {}
