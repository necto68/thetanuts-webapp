import type { IndexVaultConfig } from "../types";
import { isTestEnvironment } from "../../shared/constants";

import { developIndexVaults } from "./developIndexVaults";
import { productionIndexVaults } from "./productionIndexVaults";

export const indexVaults = isTestEnvironment
  ? developIndexVaults.concat(productionIndexVaults)
  : productionIndexVaults;

export const indexVaultsMap: Record<
  IndexVaultConfig["id"],
  IndexVaultConfig | undefined
> = Object.fromEntries(
  indexVaults.map((indexVault) => [indexVault.id, indexVault])
);
