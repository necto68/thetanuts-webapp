import type { Provider } from "@ethersproject/providers";
import { constants } from "ethers";
import Big from "big.js";

import {
  RouterV2Abi__factory as RouterV2AbiFactory,
  Erc20Abi__factory as Erc20AbiFactory,
} from "../../contracts/types";
import { convertToBig } from "../../shared/helpers";
import { ChainId } from "../../wallet/constants";
import type { NativeToken } from "../types";

const wrappedNativeTokenAddressesByChainId: { [key in ChainId]?: string } = {
  [ChainId.FILECOIN]: "0x60E1773636CF5E4A227d9AC24F20fEca034ee25A",
  [ChainId.ZK_EVM]: "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9",
};

export const nativeTokenFetcher = async (
  routerAddress: string,
  provider: Provider,
  account: string
): Promise<NativeToken> => {
  const routerContract = RouterV2AbiFactory.connect(routerAddress, provider);

  const [{ chainId }, balance] = await Promise.all([
    provider.getNetwork() as Promise<{ chainId: ChainId }>,
    account ? provider.getBalance(account).then(convertToBig) : null,
  ]);

  const savedWrappedNativeTokenAddress =
    wrappedNativeTokenAddressesByChainId[chainId];

  // TODO: remove this when we have a RouterV2 contract for Filecoin and zkEVM
  const wrappedNativeTokenAddress =
    // eslint-disable-next-line new-cap
    savedWrappedNativeTokenAddress ?? (await routerContract.WETH());

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
