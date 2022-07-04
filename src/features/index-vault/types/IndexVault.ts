import type Big from "big.js";

import type { ChainId } from "../../wallet/constants";
import type {
  BasicVault,
  PercentageYields,
  VaultType,
} from "../../basic-vault/types";

export interface BasicVaultInfo {
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
  middleIndexPriceByChainId: Partial<Record<ChainId, number>>;
  indexTokenAddress: string;
  vaults: BasicVault[];
  vaultsInfos: BasicVaultInfo[];
  totalWeight: Big;
  totalValueLocked: number;
  totalRemainder: number;
  totalPercentageYields: PercentageYields;
  chainId: ChainId;
  supportedChainIds: ChainId[];
}
