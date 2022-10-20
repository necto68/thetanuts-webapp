import type { BasicVaultConfig } from "../types";
import { BasicVaultType } from "../types";
import { ChainId } from "../../wallet/constants";

export const developBasicVaults: BasicVaultConfig[] = [
  {
    id: "TN-CSCCv0-ETHUSD-1DAY",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0x6BA28c5a069455ccB6a25723acDf2Eec0A436Db6",
    },
  },
  {
    id: "TN-CSCCv0-ETHUSD-2DAY",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0x619761Cf639DD8D30d671CE6bC912A75a79B8f34",
    },
  },
  {
    id: "TN-CSCCv0-ETHUSD-3DAY",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0xb375b56cAf4eD3b31b44c431E30Cc4Cb344D7f0F",
    },
  },
];

export const developDegenVaults: BasicVaultConfig[] = [
  {
    id: "TN-CSCLPv1-ETHtUSDC",
    basicVaultType: BasicVaultType.DEGEN,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0x47Bf61C2CBA9D59d00F71257318182cd8C017c59",
    },
  },
  {
    id: "TN-CSLCCv1-ETHtUSDC",
    basicVaultType: BasicVaultType.DEGEN,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0xA3750cFDF2Fb9E3E63c0174C0F4330efa697665b",
    },
  },
  {
    id: "TN-CSCVv1-ETHtUSDC",
    basicVaultType: BasicVaultType.DEGEN,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0x35395Ffb2BD10E3dC3892Ca39aBAdBc9967f4a73",
    },
  },
];

export const developLendingMarketVaults: BasicVaultConfig[] = [
  {
    id: "LM-TN-CSCCv0-ETHUSD-1DAY",
    basicVaultType: BasicVaultType.LENDING_MARKET,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0x6BA28c5a069455ccB6a25723acDf2Eec0A436Db6",
    },
  },
  {
    id: "LM-TN-CSCCv0-ETHUSD-2DAY",
    basicVaultType: BasicVaultType.LENDING_MARKET,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0x619761Cf639DD8D30d671CE6bC912A75a79B8f34",
    },
  },
  {
    id: "LM-TN-CSCCv0-ETHUSD-3DAY",
    basicVaultType: BasicVaultType.LENDING_MARKET,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0xb375b56cAf4eD3b31b44c431E30Cc4Cb344D7f0F",
    },
  },
];

export const developAllBasicVaults = developBasicVaults.concat(
  developDegenVaults,
  developLendingMarketVaults
);
