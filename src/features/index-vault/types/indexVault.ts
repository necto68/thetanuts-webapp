import type Big from "big.js";

import type { ChainId } from "../../wallet/constants";

import type { Vault, PercentageYields } from "./vault";

export enum VaultType {
  CALL = "CALL",
  PUT = "PUT",
  IL = "IL",
}

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
  oracleIndexPrice: number;
  middleIndexPrice: number;
  indexTokenAddress: string;
  vaults: Vault[];
  vaultsInfos: VaultInfo[];
  totalWeight: Big;
  totalValueLocked: number;
  totalRemainder: number;
  totalPercentageYields: PercentageYields;
  chainId: ChainId;
  supportedChainIds: ChainId[];
}
