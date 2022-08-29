import type { BasicVaultConfig } from "../types";
import { isTestEnvironment } from "../../shared/constants";

import { developBasicVaults } from "./developBasicVaults";
import { productionBasicVaults } from "./productionBasicVaults";

export const basicVaults = isTestEnvironment
  ? developBasicVaults.concat(productionBasicVaults)
  : productionBasicVaults;

export const basicVaultsMap: Record<
  BasicVaultConfig["id"],
  BasicVaultConfig | undefined
> = Object.fromEntries(
  basicVaults.map((basicVault) => [basicVault.id, basicVault])
);
