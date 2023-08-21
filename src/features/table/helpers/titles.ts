import { VaultModalType } from "../../root/types";
import type { BasicVault } from "../../basic-vault/types";
import { VaultType } from "../../basic-vault/types";
import { basicVaultTypesPrefixes, vaultTypesPrefixes } from "../constants";
import { expiryFormatter } from "../../shared/helpers";

export const getVaultTitle = (
  vaultType: VaultModalType,
  type: BasicVault["type"],
  assetSymbol: BasicVault["assetSymbol"],
  collateralSymbol: BasicVault["collateralSymbol"]
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
  type: BasicVault["type"],
  assetSymbol: BasicVault["assetSymbol"],
  collateralSymbol: BasicVault["collateralSymbol"]
) => {
  const isPutType = type === VaultType.PUT;

  const assetsTitle = isPutType
    ? `${collateralSymbol}-${assetSymbol}`
    : assetSymbol;

  const typeTitle = isPutType ? "Puts" : "Calls";

  const titleArray = [assetsTitle, typeTitle];

  return titleArray.join(" ");
};

export const getLongOptionTokenSymbol = (
  type: BasicVault["type"],
  assetSymbol: BasicVault["assetSymbol"]
) => {
  const typePostfix = type === VaultType.PUT ? "P" : "C";
  const titleArray = [assetSymbol, typePostfix];

  return titleArray.join("-");
};

export const getLongOptionTokenTitle = (
  type: BasicVault["type"],
  assetSymbol: BasicVault["assetSymbol"],
  expiry: BasicVault["expiry"],
  strikePrices: BasicVault["strikePrices"]
) => {
  const formattedExpiry = expiryFormatter(expiry);
  const typePostfix = type === VaultType.PUT ? "P" : "C";

  const titleArray = [
    assetSymbol,
    formattedExpiry,
    strikePrices[0],
    typePostfix,
  ];

  return titleArray.join("-");
};

export const getLendingPoolTokenTitle = (
  type: BasicVault["type"],
  assetSymbol: BasicVault["assetSymbol"],
  collateralSymbol: BasicVault["collateralSymbol"]
) => {
  const isPutType = type === VaultType.PUT;

  const assetsTitle = isPutType
    ? `a${collateralSymbol}-${assetSymbol}`
    : `a${assetSymbol}`;

  const typeTitle = isPutType ? "Puts" : "Calls";

  const titleArray = [assetsTitle, typeTitle];

  return titleArray.join(" ");
};
