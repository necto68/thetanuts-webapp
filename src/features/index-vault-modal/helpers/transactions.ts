import type { Signer } from "ethers";
import Big from "big.js";
import type { CallOverrides } from "@ethersproject/contracts";

import type { Token } from "../types";
import { MutationType } from "../types";
import { convertToBig } from "../../vault/helpers";
import type { ChainId } from "../../wallet/constants";
import { chainsMap } from "../../wallet/constants";

export const getSwapTransactionParameters = async (
  mutationType: MutationType,
  sourceValue: string,
  targetValue: string,
  sourceData: Token,
  targetData: Token,
  slippageToleranceValue: string,
  signer: Signer
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

export const getTransactionOptions = async (
  signer: Signer,
  mutationType?: MutationType,
  amountIn?: string
) => {
  const transactionOptions: CallOverrides = {};

  const [chainId, gasPrice] = await Promise.all([
    signer.getChainId() as Promise<ChainId>,
    signer.getGasPrice().then(convertToBig),
  ] as const);

  const { minGasPrice } = chainsMap[chainId];

  const isNativeAssetTransaction =
    mutationType &&
    [
      MutationType.swapExactETHForTokens,
      MutationType.swapETHForExactTokens,
      MutationType.depositNative,
    ].includes(mutationType);

  if (minGasPrice && gasPrice.lt(minGasPrice)) {
    transactionOptions.gasPrice = minGasPrice.toString();
  }

  if (isNativeAssetTransaction && amountIn) {
    transactionOptions.value = amountIn;
  }

  return transactionOptions;
};
