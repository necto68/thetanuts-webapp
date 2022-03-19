import { ChainId } from "../../wallet/constants";
import type { IndexVaultConfig } from "../types";

export const indexVaults: IndexVaultConfig[] = [
  {
    id: "TN-MVV1-ETH-CALL",
    isFeatured: true,

    source: {
      chainId: ChainId.POLYGON,
      indexVaultAddress: "0xa0759c71Bf30eA958D7C67D280314f0655aee5Bc",
    },

    replications: [
      {
        chainId: ChainId.BSC,
        assetTokenAddress: "0x47225f6BD4a99E4099162b8674F21bB1100AA33c",
        indexTokenAddress: "0xB404B6Bc6537d66FFadE642B0158D423E2A6De22",
      },
    ],
  },
  {
    id: "TN-MVV1-MATIC-CALL",
    isFeatured: true,

    source: {
      chainId: ChainId.POLYGON,
      indexVaultAddress: "0x354E37ca9FE751246C28C9EC07de30845a9b61C2",
    },

    replications: [],
  },
];

export const indexVaultsMap: Record<
  IndexVaultConfig["id"],
  IndexVaultConfig | undefined
> = Object.fromEntries(
  indexVaults.map((indexVault) => [indexVault.id, indexVault])
);
