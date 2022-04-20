import type Big from "big.js";

import type { ChainId } from "../../wallet/constants";

export interface Token {
  symbol: string;
  balance: Big | null;
  allowance: Big;
  tokenDivisor: Big;
  tokenAddress: string;
  chainId: ChainId;
}

export interface NativeToken extends Omit<Token, "tokenAddress"> {
  wrappedNativeTokenAddress: string;
}
