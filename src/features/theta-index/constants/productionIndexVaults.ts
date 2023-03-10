import type { IndexVaultConfig } from "../types";
import { ChainId } from "../../wallet/constants";

export const productionIndexVaults: IndexVaultConfig[] = [
  {
    id: "TN-IDX-USDC-PUT",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      indexVaultAddress: "0xC2C3AE0a7b405058558C9b4a63b373486CB86Ac7",
    },

    replications: [
      {
        chainId: ChainId.BSC,
        assetTokenAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        indexTokenAddress: "0x88d52A53B229C321b97AA71A6cB11d22BEAE43ba",
      },
      {
        chainId: ChainId.POLYGON,
        assetTokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        indexTokenAddress: "0x35b51Ff33bE10a9a741e9C9d3f17585e4b7D15C0",
      },
      {
        chainId: ChainId.AVALANCHE,
        assetTokenAddress: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
        indexTokenAddress: "0xCec3668738D7BC4B4d50Fc725D181A65758579aA",
      },
      {
        chainId: ChainId.FANTOM,
        assetTokenAddress: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
        indexTokenAddress: "0x29b662dE10ceAA7cb254E475622277B6Fc25DA71",
      },
      {
        chainId: ChainId.ARBITRUM,
        assetTokenAddress: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
        indexTokenAddress: "0x9cB7C512Da0b6BA5f06eA1C04f2cC82F132e348B",
      },
    ],

    priceFeeds: {
      assetPriceFeedAddress: "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
      indexPriceFeedAddress: "0xC78a979CEA97BCa6d07a91d021E9635C91425B84",
    },
  },
  {
    id: "TN-IDX-WBTC-CALL",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      indexVaultAddress: "0x95C59DAf5950101d6afa6875091B48f5A36278c2",
    },

    replications: [
      {
        chainId: ChainId.BSC,
        assetTokenAddress: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        indexTokenAddress: "0xE7073fec3057e5CfF1a51906bcbb84ef0f5e655c",
      },
      {
        chainId: ChainId.POLYGON,
        assetTokenAddress: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
        indexTokenAddress: "0xDCFBA6E5fB7c491e98eE32e099048ae0CF34ac15",
      },
      {
        chainId: ChainId.AVALANCHE,
        assetTokenAddress: "0x50b7545627a5162F82A992c33b87aDc75187B218",
        indexTokenAddress: "0xc2a47e9556880Cd880D4F7E110A5780e0Bc9feE7",
      },
      {
        chainId: ChainId.FANTOM,
        assetTokenAddress: "0x321162Cd933E2Be498Cd2267a90534A804051b11",
        indexTokenAddress: "0x328f8Fb3FF6F7709D50dd1d3A33BCe423b7d0997",
      },
    ],

    priceFeeds: {
      assetPriceFeedAddress: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
      indexPriceFeedAddress: "0x52e3B657F71823CE383f839772A0bd378dE5f017",
    },
  },
  {
    id: "TN-IDX-WETH-CALL",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      indexVaultAddress: "0xEC4865d6C57Dd8a4Ce2CFa212C91738424E572De",
    },

    replications: [
      {
        chainId: ChainId.BSC,
        assetTokenAddress: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        indexTokenAddress: "0x8525ba32bd434b20996f34ba03E01af0393Daa5C",
      },
      {
        chainId: ChainId.POLYGON,
        assetTokenAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        indexTokenAddress: "0x5A4c5065df0E1b71802Ab7fD9C0B6F314B4160e0",
      },
      {
        chainId: ChainId.AVALANCHE,
        assetTokenAddress: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
        indexTokenAddress: "0xa7D010C882887B653aa65f33210cc2dbd01A90F9",
      },
      {
        chainId: ChainId.FANTOM,
        assetTokenAddress: "0x74b23882a30290451A17c44f4F05243b6b58C76d",
        indexTokenAddress: "0xdfB107Acf857874c964e0C3c1b3CC4f69F50De98",
      },
    ],

    priceFeeds: {
      assetPriceFeedAddress: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
      indexPriceFeedAddress: "0x169ccdD0706833001A576CFdc4adC7D29d8B6771",
    },
  },
];
