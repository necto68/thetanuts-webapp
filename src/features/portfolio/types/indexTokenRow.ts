import type { IndexVault } from "../../index-vault/types";
import type { Token } from "../../index-vault-modal/types";
import type { PercentageYields } from "../../vault/types";

export interface IndexTokenRow
  extends Pick<
      IndexVault,
      "assetSymbol" | "chainId" | "id" | "indexPrice" | "type"
    >,
    Pick<Token, "balance" | "symbol" | "tokenAddress">,
    Pick<PercentageYields, "annualPercentageYield"> {
  vaultType: string;
}

// TODO: add more different vault types (in vaultType) ^
