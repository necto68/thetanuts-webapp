import type { Provider } from "@ethersproject/providers";
import { constants } from "ethers";
import Big from "big.js";

import {
  RouterV2Abi__factory as RouterV2AbiFactory,
  Erc20Abi__factory as Erc20AbiFactory,
} from "../../contracts/types";
import { convertToBig } from "../../shared/helpers";
import type { ChainId } from "../../wallet/constants";
import type { NativeToken } from "../types";

export const nativeTokenFetcher = async (
  routerAddress: string,
  provider: Provider,
  account: string
): Promise<NativeToken> => {
  const routerContract = RouterV2AbiFactory.connect(routerAddress, provider);

  const [{ chainId }, wrappedNativeTokenAddress, balance] = await Promise.all([
    provider.getNetwork() as Promise<{ chainId: ChainId }>,
    // eslint-disable-next-line new-cap
    routerContract.WETH(),
    account ? provider.getBalance(account).then(convertToBig) : null,
  ]);

  const wrappedTokenContract = Erc20AbiFactory.connect(
    wrappedNativeTokenAddress,
    provider
  );

  const [wrappedTokenSymbol] = await Promise.all([
    wrappedTokenContract.symbol(),
  ]);

  const symbol = wrappedTokenSymbol.startsWith("W")
    ? wrappedTokenSymbol.slice(1)
    : `Native ${wrappedTokenSymbol}`;

  const allowance = convertToBig(constants.MaxUint256);

  const tokenDivisor = new Big(10).pow(18);

  return {
    symbol,
    balance: balance?.div(tokenDivisor) ?? null,
    allowance: allowance.div(tokenDivisor),
    tokenDivisor,
    wrappedNativeTokenAddress,
    chainId,
  };
};
