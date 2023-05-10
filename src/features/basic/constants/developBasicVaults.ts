import type { BasicVaultConfig, LongVaultConfig } from "../types";
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

export const developWheelVaults: BasicVaultConfig[] = [
  {
    id: "TN-SMv1-ETHtUSDC",
    basicVaultType: BasicVaultType.WHEEL,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0x3f86B12EF226e83e7F8Ad2eAE4fA065f16f6A1A5",
    },
  },
];

export const developLongCallVaults: LongVaultConfig[] = [
  // TODO: hide long vaults
  // {
  //   id: "L-TN-CSCCv0-ETHUSD-1DAY",
  //   basicVaultType: BasicVaultType.LONG,
  //   source: {
  //     chainId: ChainId.POLYGON,
  //     basicVaultAddress: "0x6BA28c5a069455ccB6a25723acDf2Eec0A436Db6",
  //   },
  //   chartSymbol: "ETHUSDT",
  //   protocolDataProviderAddress: "0x42e93Ece796F510FD35a4c603E2521fd6e76a64D",
  // },
  // {
  //   id: "L-TN-CSCCv0-ETHUSD-2DAY",
  //   basicVaultType: BasicVaultType.LONG,
  //   source: {
  //     chainId: ChainId.POLYGON,
  //     basicVaultAddress: "0x619761Cf639DD8D30d671CE6bC912A75a79B8f34",
  //   },
  //   chartSymbol: "ETHUSDT",
  //   protocolDataProviderAddress: "0x42e93Ece796F510FD35a4c603E2521fd6e76a64D",
  // },
  // {
  //   id: "L-TN-CSCCv0-ETHUSD-3DAY",
  //   basicVaultType: BasicVaultType.LONG,
  //   source: {
  //     chainId: ChainId.POLYGON,
  //     basicVaultAddress: "0xb375b56cAf4eD3b31b44c431E30Cc4Cb344D7f0F",
  //   },
  //   chartSymbol: "ETHUSDT",
  //   protocolDataProviderAddress: "0x42e93Ece796F510FD35a4c603E2521fd6e76a64D",
  // },
];

export const developLongPutVaults: LongVaultConfig[] = [];

export const developLongVaults: LongVaultConfig[] =
  // eslint-disable-next-line sonarjs/no-empty-collection
  developLongCallVaults.concat(developLongPutVaults);

export const developAllBasicVaults = developBasicVaults.concat(
  developDegenVaults,
  developWheelVaults,
  developLongVaults
);
