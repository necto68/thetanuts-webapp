import { VaultModalType } from "../../root/types";
import { VaultType } from "../../basic-vault/types";
import { vaultTypesPrefixes, basicVaultTypesPrefixes } from "../constants";

export const getVaultTitle = (
  vaultType: VaultModalType,
  type: VaultType,
  assetSymbol: string,
  collateralSymbol: string,
  isToken = false
) => {
  const vaultPrefix = vaultTypesPrefixes[vaultType];
  const isDegenOrPutType =
    vaultType === VaultModalType.degen || type === VaultType.PUT;

  const assets = isDegenOrPutType
    ? [collateralSymbol, assetSymbol]
    : [assetSymbol];

  const typePrefix = basicVaultTypesPrefixes[type];

  const vaultTitleArray = [vaultPrefix, ...assets, typePrefix];
  const titleArray = isToken ? [...vaultTitleArray, "LP"] : vaultTitleArray;

  return titleArray.join("-");
};
