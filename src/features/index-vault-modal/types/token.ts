import type Big from "big.js";

export interface Token {
  symbol: string;
  balance: Big | null;
  allowance: Big;
  tokenDivisor: Big;
  tokenAddress: string;
}

export interface NativeToken extends Omit<Token, "tokenAddress"> {
  wrappedNativeTokenAddress: string;
}
