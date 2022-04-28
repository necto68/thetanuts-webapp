import { ChainId } from "../../wallet/constants";
import type { IndexVaultConfig } from "../types";

export const indexVaults: IndexVaultConfig[] = [
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
    ],
  },
];

export const indexVaultsMap: Record<
  IndexVaultConfig["id"],
  IndexVaultConfig | undefined
> = Object.fromEntries(
  indexVaults.map((indexVault) => [indexVault.id, indexVault])
);
