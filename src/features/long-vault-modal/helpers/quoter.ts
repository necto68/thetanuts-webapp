import type { Signer } from "ethers";

import { ChainId } from "../../wallet/constants";
import type { IQuoterV2 } from "../../contracts/types/QuoterV2Abi";
import { convertToBig } from "../../shared/helpers";
import {
  QuoterAbi__factory as QuoterAbiFactory,
  QuoterV2Abi__factory as QuoterV2AbiFactory,
} from "../../contracts/types";

export const quoteExactInputSingle = async (
  parameters: IQuoterV2.QuoteExactInputSingleParamsStruct,
  chainId: ChainId,
  quoterAddress: string,
  signer: Signer
) => {
  const { tokenIn, tokenOut, fee, amountIn, sqrtPriceLimitX96 } = parameters;

  if (chainId === ChainId.BSC) {
    const quoterV2Contract = QuoterV2AbiFactory.connect(quoterAddress, signer);

    return await quoterV2Contract.callStatic
      .quoteExactInputSingle({
        tokenIn,
        tokenOut,
        fee,
        amountIn,
        sqrtPriceLimitX96,
      })
      .then((value) => convertToBig(value.amountOut));
  }

  const quoterContract = QuoterAbiFactory.connect(quoterAddress, signer);

  return await quoterContract.callStatic
    .quoteExactInputSingle(tokenIn, tokenOut, fee, amountIn, sqrtPriceLimitX96)
    .then(convertToBig);
};

export const quoteExactOutputSingle = async (
  parameters: IQuoterV2.QuoteExactOutputSingleParamsStruct,
  chainId: ChainId,
  quoterAddress: string,
  signer: Signer
) => {
  const { tokenIn, tokenOut, fee, amount, sqrtPriceLimitX96 } = parameters;

  if (chainId === ChainId.BSC) {
    const quoterV2Contract = QuoterV2AbiFactory.connect(quoterAddress, signer);

    return await quoterV2Contract.callStatic
      .quoteExactOutputSingle({
        tokenIn,
        tokenOut,
        fee,
        amount,
        sqrtPriceLimitX96,
      })
      .then((value) => convertToBig(value.amountIn));
  }

  const quoterContract = QuoterAbiFactory.connect(quoterAddress, signer);

  return await quoterContract.callStatic
    .quoteExactOutputSingle(tokenIn, tokenOut, fee, amount, sqrtPriceLimitX96)
    .then(convertToBig);
};
