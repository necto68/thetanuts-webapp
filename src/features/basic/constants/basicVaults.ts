import type { BasicVaultConfig } from "../types";
import { isTestEnvironment } from "../../shared/constants";

import {
  developBasicVaults,
  developDegenVaults,
  developAllBasicVaults,
} from "./developBasicVaults";
import {
  productionBasicVaults,
  productionDegenVaults,
  productionAllBasicVaults,
} from "./productionBasicVaults";

export const basicVaults = isTestEnvironment
  ? developBasicVaults.concat(productionBasicVaults)
  : productionBasicVaults;

export const degenVaults = isTestEnvironment
  ? developDegenVaults.concat(productionDegenVaults)
  : productionDegenVaults;

export const allBasicVaults = isTestEnvironment
  ? developAllBasicVaults.concat(productionAllBasicVaults)
  : productionAllBasicVaults;

export const basicVaultsMap: Record<
  BasicVaultConfig["id"],
  BasicVaultConfig | undefined
> = Object.fromEntries(
  allBasicVaults.map((basicVault) => [basicVault.id, basicVault])
);
