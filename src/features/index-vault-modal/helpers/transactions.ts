import type { Signer } from "ethers";
import Big from "big.js";

import type { Token } from "../types";
import { maxSlippageTolerance } from "../constants";

export const getSwapTransactionParameters = async (
  sourceValue: string,
  targetValue: string,
  sourceData: Token,
  targetData: Token,
  signer: Signer
) => {
  const amountIn = new Big(sourceValue)
    .mul(sourceData.tokenDivisor)
    .round()
    .toString();
  const amountOut = new Big(targetValue)
    .mul(new Big(1).sub(maxSlippageTolerance))
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
