import type { BasicVaultConfig } from "../types";
import { ChainId } from "../../wallet/constants";

export const productionBasicVaults: BasicVaultConfig[] = [
  {
    id: "TN-CSCPv1-BTCUSD",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x99bA8d367044da7EB4919C3294eb9848E1D0Ed35",
    },
  },
  {
    id: "TN-CSCCv1-ETHUSD",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x8741600e72de42c2Da14f141Cd1e446e382933F3",
    },
  },
];
