import type { Provider } from "@ethersproject/providers";
import { VoidSigner } from "ethers";
import Big from "big.js";

import type { BasicVaultType } from "../../basic/types";
import { LongVaultPositionManagerAbi__factory as LongVaultPositionManagerAbiFactory } from "../../contracts/types";
import { convertToBig, queryClient } from "../../shared/helpers";
import { QueryType } from "../../shared/types";
import { longVaultsMap } from "../../basic/constants";
import { longVaultReaderFetcher } from "../../long-vault/helpers";
import { collateralAssetFetcher } from "../../long/helpers";
import { collateralAssetsMap } from "../../long/constants";
import type { LongOptionClosePositionReader } from "../types";
import { quoteExactOutputSingle } from "../../long-vault-modal/helpers";

const defaultLongOptionClosePositionReader: LongOptionClosePositionReader = {
  inputValue: "",
  minToReceiveCollateralValue: null,
};

export const longOptionClosePositionReaderFetcher = async (
  basicVaultId: string,
  basicVaultType: BasicVaultType,
  basicVaultAddress: string,
  longVaultPositionManagerAddress: string,
  quoterAddress: string,
  account: string,
  provider: Provider,
  inputValue: string
): Promise<LongOptionClosePositionReader> => {
  const signer = new VoidSigner(account, provider);

  const longVaultPositionManagerContract =
    LongVaultPositionManagerAbiFactory.connect(
      longVaultPositionManagerAddress,
      signer
    );

  const longVaultConfig = longVaultsMap[basicVaultId];
  const chainId = longVaultConfig?.source.chainId ?? 0;

  const { protocolDataProviderAddress = "" } = longVaultConfig ?? {};

  const [longVaultReader] = await Promise.all([
    queryClient.fetchQuery(
      [QueryType.longVaultReader, basicVaultId, basicVaultType, account],
      async () =>
        await longVaultReaderFetcher(
          basicVaultId,
          basicVaultType,
          basicVaultAddress,
          longVaultPositionManagerAddress,
          protocolDataProviderAddress,
          account,
          provider
        ),
      { staleTime: 10_000 }
    ),
  ]);

  const collateralAssetId = longVaultReader.collateralAsset.id;
  const collateralAssetConfig = collateralAssetsMap[collateralAssetId];

  const {
    collateralAssetAddress = "",
    lendingPoolAddressesProviderAddress = "",
  } = collateralAssetConfig?.source ?? {};

  const [collateralAsset] = await Promise.all([
    queryClient.fetchQuery(
      [
        QueryType.collateralAsset,
        collateralAssetId,
        collateralAssetAddress,
        lendingPoolAddressesProviderAddress,
        account,
      ],

      async () =>
        await collateralAssetFetcher(
          collateralAssetId,
          collateralAssetAddress,
          lendingPoolAddressesProviderAddress,
          provider,
          account
        ),
      { staleTime: 10_000 }
    ),
  ]);

  const { collateralToken, lendingPoolAddress } = collateralAsset;
  const collateralTokenAddress = collateralToken.tokenAddress;

  const inputValueBig = new Big(inputValue || 0);

  if (inputValueBig.lte(0)) {
    return defaultLongOptionClosePositionReader;
  }

  const inputAmount = inputValueBig.mul(collateralToken.tokenDivisor).round();

  const parameters = {
    tokenIn: collateralTokenAddress,
    tokenOut: basicVaultAddress,
    amount: inputAmount.toString(),
    fee: 500,
    sqrtPriceLimitX96: 0,
  };

  const quoteOutput = await quoteExactOutputSingle(
    parameters,
    chainId,
    quoterAddress,
    signer
  );

  // slippage allowance - 0.05%
  const maxCollateralToUse = quoteOutput.mul(1.0005).round();

  let minToReceiveCollateralValue = null;

  try {
    minToReceiveCollateralValue =
      await longVaultPositionManagerContract.callStatic[
        "closeVaultAndWithdrawPosition(address,address,address,uint256)"
      ](
        account,
        basicVaultAddress,
        lendingPoolAddress,
        maxCollateralToUse.toString()
      )
        .then(convertToBig)
        .then((value) => value.div(collateralToken.tokenDivisor));
  } catch {
    minToReceiveCollateralValue = null;
  }

  return {
    inputValue,
    minToReceiveCollateralValue,
  };
};
