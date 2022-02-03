import { ChainId } from "../../wallet/constants";
import type { UIContract } from "../types";

export const uiContracts: UIContract[] = [
  {
    chainId: ChainId.ETHEREUM,
    address: "0x7cae286b2Ed2f21BA2580274F1671EC76d54A4bD",
  },
  {
    chainId: ChainId.BSC,
    address: "0x9E2aaF377D1dbe8dB493E2084385f03E94d5d3b9",
  },
  {
    chainId: ChainId.AVALANCHE,
    address: "0x9214AEB491Fb53115b4439d5cDcd2DB947E4e18c",
  },
  {
    chainId: ChainId.MATIC,
    address: "0x9214AEB491Fb53115b4439d5cDcd2DB947E4e18c",
  },
  {
    chainId: ChainId.FANTOM,
    address: "0x9214AEB491Fb53115b4439d5cDcd2DB947E4e18c",
  },
];

export const uiContractsMap: Record<number, UIContract> = Object.fromEntries(
  uiContracts.map((uiContract) => [uiContract.chainId, uiContract])
);
