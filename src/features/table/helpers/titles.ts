import { VaultModalType } from "../../root/types";
import { VaultType } from "../../basic-vault/types";
import { vaultTypesPrefixes, basicVaultTypesPrefixes } from "../constants";

export const getVaultTitle = (
  vaultType: VaultModalType,
  type: VaultType,
  assetSymbol: string,
  collateralSymbol?: string
) => {
  const vaultPrefix = vaultTypesPrefixes[vaultType];
  const isDegenOrPutType =
    vaultType === VaultModalType.degen ||
    (vaultType === VaultModalType.basic && type === VaultType.PUT);

  const assets = isDegenOrPutType
    ? [collateralSymbol, assetSymbol]
    : [assetSymbol];

  const typePrefix = basicVaultTypesPrefixes[type];

  const titleArray = [vaultPrefix, ...assets, typePrefix];

  return titleArray.join("-");
};
