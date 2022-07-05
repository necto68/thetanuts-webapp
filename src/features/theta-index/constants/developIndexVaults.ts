import { ChainId } from "../../wallet/constants";
import type { IndexVaultConfig } from "../types";

export const developIndexVaults: IndexVaultConfig[] = [
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
        assetTokenAddress: "0x80076B8992E75213cDc784e9C78dc795b5c1d698",
        indexTokenAddress: "0x0Fe64499e5B6E2c6B56d393dA459DA8D8B7F7b86",
      },
      {
        chainId: ChainId.AVALANCHE,
        assetTokenAddress: "0xE09E8ba7cf4E296c7263f69095c78BCfA0f211AA",
        indexTokenAddress: "0xdE2558F1b88877c1ba79C17FE14ccC17e389F9C7",
      },
      {
        chainId: ChainId.ETHEREUM,
        assetTokenAddress: "0xD9e762A3bC16f34beFbDb0044c90B09861106fDC",
        indexTokenAddress: "0xB2102F52ffB0F1B8f5A7cE4368fe6E0917cE77f1",
      },
      {
        chainId: ChainId.FANTOM,
        assetTokenAddress: "0x6b0E6AC5fa5ede847DadCE047E7914ECAa7e9A97",
        indexTokenAddress: "0xa08363813fFE8aAFDce8859A96993839F6c15f26",
      },
    ],

    priceFeeds: {
      assetPriceFeedAddress: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
      indexPriceFeedAddress: "0xA8459eC6DF0D9a61058C43a308dD8A2CEc9d550E",
    },
  },

  // {
  //   id: "TN-MVV1-MATIC-CALL",
  //   isFeatured: true,
  //
  //   source: {
  //     chainId: ChainId.POLYGON,
  //     indexVaultAddress: "0x354E37ca9FE751246C28C9EC07de30845a9b61C2",
  //   },
  //
  //   replications: [
  //     {
  //       chainId: ChainId.BSC,
  //       assetTokenAddress: "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
  //       indexTokenAddress: "0xbed758d321bb24f98ef958873cf624d7a81ae610",
  //     },
  //   ],
  // },
];
