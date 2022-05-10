import type { Provider } from "@ethersproject/providers";
import Big from "big.js";

import { convertToBig, queryClient } from "../../shared/helpers";
import { RouterV2Abi__factory as RouterV2AbiFactory } from "../../contracts/types";
import { QueryType } from "../../shared/types";
import { tokenFetcher } from "../../index-vault-modal/helpers";

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

  const inputAssetTokenValue = assetToken.tokenDivisor.toString();
  const inputIndexTokenValue = indexToken.tokenDivisor.toString();

  const [outputIndexValue, outputAssetValue] = await Promise.all([
    await routerContract
      .getAmountsOut(inputAssetTokenValue, [
        assetTokenAddress,
        indexTokenAddress,
      ])
      .then((amountsOut) =>
        convertToBig(amountsOut[1]).div(indexToken.tokenDivisor)
      ),
    await routerContract
      .getAmountsOut(inputIndexTokenValue, [
        indexTokenAddress,
        assetTokenAddress,
      ])
      .then((amountsOut) =>
        convertToBig(amountsOut[1]).div(assetToken.tokenDivisor)
      ),
  ]);

  const assetPriceBig = new Big(assetPrice);

  const depositingPrice = assetPriceBig.div(outputIndexValue);
  const withdrawingPrice = assetPriceBig.mul(outputAssetValue);

  const middlePrice = depositingPrice.add(withdrawingPrice).div(2).round(2);

  return middlePrice.toNumber();
};
