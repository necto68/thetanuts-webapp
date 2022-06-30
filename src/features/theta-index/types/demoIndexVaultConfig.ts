import type { IndexVault } from "../../index-vault/types";

import type { IndexVaultConfig } from "./indexVaultConfig";

export interface DemoIndexVaultConfig
  extends Pick<IndexVaultConfig, "id" | "isFeatured">,
    Pick<
      IndexVault,
      | "assetSymbol"
      | "supportedChainIds"
      | "totalPercentageYields"
      | "totalValueLocked"
      | "type"
    > {
  isDemo: true;
}
