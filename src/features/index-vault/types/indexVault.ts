import type Big from "big.js";

import type { VaultType } from "../../vault/constants";
import type { ChainId } from "../../wallet/constants";
import type { PercentageYields } from "../../vault/types";

import type { Vault } from "./vault";

export interface VaultInfo {
  lpAmount: Big;
  weight: Big;
  allocation: number;
}

export interface IndexVault {
  id: string;
  type: VaultType;
  assetSymbol: string;
  assetPrice: number;
  assetTokenAddress: string;
  indexPrice: number;
  indexTokenAddress: string;
  vaults: Vault[];
  vaultsInfos: VaultInfo[];
  totalWeight: Big;
  totalValueLocked: number;
  totalPercentageYields: PercentageYields;
  chainId: ChainId;
  supportedChainIds: ChainId[];
}
