import type { Provider } from "@ethersproject/providers";
import Big from "big.js";

import { convertToBig, queryClient } from "../../shared/helpers";
import { RouterV2Abi__factory as RouterV2AbiFactory } from "../../contracts/types";
import { QueryType } from "../../shared/types";
import { tokenFetcher } from "../../index-vault-modal/helpers";
import type { Token } from "../../index-vault-modal/types";

export const middleIndexPriceFetcher = async (
  assetPrice: number,
  assetTokenAddress: string,
  indexTokenAddress: string,
  routerAddress: string,
  provider: Provider
): Promise<number> => {
  const [assetToken, indexToken] = await Promise.all(
    [assetTokenAddress, indexTokenAddress].map(
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      (tokenAddress) =>
        queryClient.fetchQuery(
          [QueryType.token, tokenAddress, routerAddress, ""],
          // eslint-disable-next-line @typescript-eslint/promise-function-async
          () => tokenFetcher(tokenAddress, routerAddress, provider, "")
        )
    )
  );

  const routerContract = RouterV2AbiFactory.connect(routerAddress, provider);

  const getAmountOut = async (
    inputValue: Big,
    inputToken: Token,
    outputToken: Token
  ) => {
    try {
      const amountOut = await routerContract
        .getAmountsOut(inputValue.toString(), [
          inputToken.tokenAddress,
          outputToken.tokenAddress,
        ])
        .then((amountsOut) => amountsOut[1]);

      return convertToBig(amountOut).div(outputToken.tokenDivisor);
    } catch {
      return new Big(0);
    }
  };

  const [outputIndexValue, outputAssetValue] = await Promise.all([
    getAmountOut(assetToken.tokenDivisor, assetToken, indexToken),
    getAmountOut(indexToken.tokenDivisor, indexToken, assetToken),
  ]);

  const assetPriceBig = new Big(assetPrice);

  const depositingPrice = outputIndexValue.gt(0)
    ? assetPriceBig.div(outputIndexValue)
    : new Big(0);
  const withdrawingPrice = assetPriceBig.mul(outputAssetValue);

  const middlePrice = depositingPrice.add(withdrawingPrice).div(2).round(2);

  return middlePrice.toNumber();
};
