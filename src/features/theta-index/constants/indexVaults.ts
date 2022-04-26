import { ChainId } from "../../wallet/constants";
import type { IndexVaultConfig } from "../types";

export const indexVaults: IndexVaultConfig[] = [
  {
    id: "TN-IDX-USDC-PUT",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      indexVaultAddress: "0x300b428bc0906F97B44B3996B727cd7032AdD123",
    },

    replications: [
      {
        chainId: ChainId.BSC,
        assetTokenAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        indexTokenAddress: "0x9c1833E17bB83dDd170cC7c38869cF4F2EDcD6b6",
      },
      {
        chainId: ChainId.POLYGON,
        assetTokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        indexTokenAddress: "0x7324033598dA8cc8941fA0bA9ef9d4c703Dbc007",
      },
      {
        chainId: ChainId.AVALANCHE,
        assetTokenAddress: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
        indexTokenAddress: "0xa405a550a8F6308306477B7a3a9F24c7E9eb0E08",
      },
      {
        chainId: ChainId.FANTOM,
        assetTokenAddress: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
        indexTokenAddress: "0xE1B701D371C0A7386e60522BD8F6fC60aCbF43B5",
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
