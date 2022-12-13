import { VaultModalType } from "../../root/types";
import { VaultType } from "../../basic-vault/types";
import { basicVaultTypesPrefixes, vaultTypesPrefixes } from "../constants";

export const getVaultTitle = (
  vaultType: VaultModalType,
  type: VaultType,
  assetSymbol: string,
  collateralSymbol: string
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

export const getLongVaultContractsTitle = (
  type: VaultType,
  assetSymbol: string,
  collateralSymbol: string
) => {
  const isPutType = type === VaultType.PUT;

  const assetsTitle = isPutType
    ? `${collateralSymbol}-${assetSymbol}`
    : assetSymbol;

  const typeTitle = isPutType ? "Puts" : "Calls";

  const titleArray = [assetsTitle, typeTitle];

  return titleArray.join(" ");
};
