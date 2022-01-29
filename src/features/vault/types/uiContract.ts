import type { ChainId } from "../../wallet/constants";

export interface UIContract {
  chainId: ChainId;
  address: string;
}
