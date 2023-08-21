import type { BasicVaultConfig, LongVaultConfig } from "../types";
import { isTestEnvironment } from "../../shared/constants";

import {
  developBasicVaults,
  developDegenVaults,
  developWheelVaults,
  developLongTradeVaults,
  developLongVaults,
  developAllBasicVaults,
} from "./developBasicVaults";
import {
  productionBasicVaults,
  productionDegenVaults,
  productionWheelVaults,
  productionLongVaults,
  productionLongTradeVaults,
  productionAllBasicVaults,
} from "./productionBasicVaults";

export const basicVaults = isTestEnvironment
  ? developBasicVaults.concat(productionBasicVaults)
  : productionBasicVaults;

export const degenVaults = isTestEnvironment
  ? developDegenVaults.concat(productionDegenVaults)
  : productionDegenVaults;

export const wheelVaults = isTestEnvironment
  ? developWheelVaults.concat(productionWheelVaults)
  : productionWheelVaults;

export const longTradeVaults = isTestEnvironment
  ? developLongTradeVaults.concat(productionLongTradeVaults)
  : productionLongTradeVaults;

export const longVaults = isTestEnvironment
  ? developLongVaults.concat(productionLongVaults)
  : productionLongVaults;

export const allBasicVaults = isTestEnvironment
  ? developAllBasicVaults.concat(productionAllBasicVaults)
  : productionAllBasicVaults;

export const basicVaultsMap: Record<
  BasicVaultConfig["id"],
  BasicVaultConfig | undefined
> = Object.fromEntries(
  allBasicVaults.map((basicVault) => [basicVault.id, basicVault])
);

export const longVaultsMap: Record<
  LongVaultConfig["id"],
  LongVaultConfig | undefined
> = Object.fromEntries(
  longVaults.map((longVault) => [longVault.id, longVault])
);

// all develop Basic Vaults
// + BTC and ETH call/put production Basic Vaults
// + stMATIC call production Basic Vault
// TODO: Remove this when we support depositor for all basic vaults
export const basicVaultsIdsThatSupportDepositor = developBasicVaults
  .map(({ id }) => id)
  .concat(degenVaults.map(({ id }) => id))
  .concat([
    "TN-CSCCv1-ETHUSD-A",
    "TN-CSCCv1-BTCUSD-A",
    "TN-CSCPv1-ETHUSD-A",
    "TN-CSCPv1-BTCUSD",
    "TN-CSCCv1-STMATICUSD",
  ]);
