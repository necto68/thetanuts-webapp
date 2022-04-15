import type { Signer } from "ethers";
import Big from "big.js";

import type { Token } from "../types";
import { MutationType } from "../types";

export const getSwapTransactionParameters = async (
  sourceValue: string,
  targetValue: string,
  sourceData: Token,
  targetData: Token,
  slippageToleranceValue: string,
  signer: Signer,
  mutationType: MutationType
) => {
  const isExactAmountIn = [
    MutationType.swapExactTokensForTokens,
    MutationType.swapExactTokensForETH,
    MutationType.swapExactETHForTokens,
  ].includes(mutationType);

  const slippageTolerance = new Big(slippageToleranceValue).div(100);

  const amountOutMultiplier = isExactAmountIn
    ? new Big(1).sub(slippageTolerance)
    : 1;

  const amountIn = new Big(sourceValue)
    .mul(sourceData.tokenDivisor)
    .round()
    .toString();

  const amountOut = new Big(targetValue)
    .mul(amountOutMultiplier)
    .mul(targetData.tokenDivisor)
    .round()
    .toString();

  const path = [sourceData.tokenAddress, targetData.tokenAddress];
  const to = await signer.getAddress();

  // current date + 20 minutes
  const deadline = Math.floor(Date.now() / 1000) + 20 * 60;

  return {
    amountIn,
    amountOut,
    path,
    to,
    deadline,
  };
};
