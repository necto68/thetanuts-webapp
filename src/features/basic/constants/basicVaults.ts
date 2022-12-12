import type { BasicVaultConfig } from "../types";
import { isTestEnvironment } from "../../shared/constants";

import {
  developBasicVaults,
  developDegenVaults,
  developLongVaults,
  developAllBasicVaults,
} from "./developBasicVaults";
import {
  productionBasicVaults,
  productionDegenVaults,
  productionLongVaults,
  productionAllBasicVaults,
} from "./productionBasicVaults";

export const basicVaults = isTestEnvironment
  ? developBasicVaults.concat(productionBasicVaults)
  : productionBasicVaults;

export const degenVaults = isTestEnvironment
  ? developDegenVaults.concat(productionDegenVaults)
  : productionDegenVaults;

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

// all develop Basic Vaults + BTC and ETH call/put production Basic Vaults
// TODO: Remove this when we support depositor for all basic vaults
export const basicVaultsIdsThatSupportDepositor = developBasicVaults
  .map(({ id }) => id)
  .concat([
    "TN-CSCCv1-ETHUSD-A",
    "TN-CSCCv1-BTCUSD-A",
    "TN-CSCPv1-ETHUSD-A",
    "TN-CSCPv1-BTCUSD",
  ]);
