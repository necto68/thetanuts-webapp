import type { ChainId } from "../constants";

export interface Chain {
  chainId: ChainId;
  title: string;
  color: string;
}
