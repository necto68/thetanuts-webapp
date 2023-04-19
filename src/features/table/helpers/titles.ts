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
  const isShowCollateralSymbol =
    (vaultType === VaultModalType.basic && type === VaultType.PUT) ||
    vaultType === VaultModalType.degen;

  const isShowTypePrefix =
    vaultType === VaultModalType.index ||
    vaultType === VaultModalType.basic ||
    vaultType === VaultModalType.degen;

  const assets = isShowCollateralSymbol
    ? [collateralSymbol, assetSymbol]
    : [assetSymbol];

  const typePrefix = basicVaultTypesPrefixes[type];

  const titleArray = [vaultPrefix, ...assets];

  if (isShowTypePrefix) {
    titleArray.push(typePrefix);
  }

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

export const getLongOptionTitle = (type: VaultType, assetSymbol: string) => {
  const typePostfix = type === VaultType.PUT ? "P" : "C";
  const titleArray = [assetSymbol, typePostfix];

  return titleArray.join("-");
};
