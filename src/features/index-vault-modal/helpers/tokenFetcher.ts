import type { Provider } from "@ethersproject/providers";
import Big from "big.js";

import type { Token } from "../types";
import { Erc20Abi__factory as Erc20AbiFactory } from "../../contracts/types";
import { convertToBig } from "../../vault/helpers";

export const tokenFetcher = async (
  tokenAddress: string,
  spenderAddress: string,
  provider: Provider,
  account: string
): Promise<Token> => {
  const tokenContract = Erc20AbiFactory.connect(tokenAddress, provider);

  const [symbol, decimals, balance, allowance] = await Promise.all([
    tokenContract.symbol(),
    tokenContract.decimals(),
    account ? tokenContract.balanceOf(account).then(convertToBig) : null,
    account
      ? tokenContract.allowance(account, spenderAddress).then(convertToBig)
      : new Big(0),
  ]);

  const tokenDivisor = new Big(10).pow(decimals);

  return {
    symbol,
    balance: balance?.div(tokenDivisor) ?? null,
    allowance: allowance.div(tokenDivisor),
    tokenDivisor,
    tokenAddress,
  };
};
