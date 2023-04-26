import type { Provider } from "@ethersproject/providers";
import { VoidSigner } from "ethers";
import Big from "big.js";

import type { BasicVaultType } from "../../basic/types";
import {
  LongVaultPositionManagerAbi__factory as LongVaultPositionManagerAbiFactory,
  QuoterAbi__factory as QuoterAbiFactory,
} from "../../contracts/types";
import { convertToBig, queryClient } from "../../shared/helpers";
import { QueryType } from "../../shared/types";
import { basicVaultFetcher } from "../../basic-vault/helpers";
import { longVaultsMap } from "../../basic/constants";
import { longVaultReaderFetcher } from "../../long-vault/helpers";
import { collateralAssetFetcher } from "../../long/helpers";
import { collateralAssetsMap } from "../../long/constants";
import type { LongOptionReader } from "../types";

const defaultLongOptionReader: LongOptionReader = {
  inputValue: "",
  LPToBorrowValue: new Big(0),
  minToReceiveLPValue: new Big(0),
  swapLeverage: null,
};

export const longOptionReaderFetcher = async (
  basicVaultId: string,
  basicVaultType: BasicVaultType,
  basicVaultAddress: string,
  longVaultPositionManagerAddress: string,
  quoterAddress: string,
  account: string,
  provider: Provider,
  inputValue: string
): Promise<LongOptionReader> => {
  const signer = new VoidSigner(account, provider);

  const longVaultPositionManagerContract =
    LongVaultPositionManagerAbiFactory.connect(
      longVaultPositionManagerAddress,
      signer
    );

  const quoterContract = QuoterAbiFactory.connect(quoterAddress, signer);

  const longVaultConfig = longVaultsMap[basicVaultId];
  const chainId = longVaultConfig?.source.chainId ?? 0;

  const { protocolDataProviderAddress = "" } = longVaultConfig ?? {};

  const [basicVault, longVaultReader] = await Promise.all([
    queryClient.fetchQuery(
      [QueryType.basicVault, basicVaultId, basicVaultType, chainId],
      async () =>
        await basicVaultFetcher(
          basicVaultId,
          basicVaultType,
          basicVaultAddress,
          provider
        ),
      { staleTime: 10_000 }
    ),

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

  const { debtTokenPrice } = longVaultReader;
  const { loanToValue, collateralToken, collateralPrice, lendingPoolAddress } =
    collateralAsset;
  const collateralTokenAddress = collateralToken.tokenAddress;

  const inputValueBig = new Big(inputValue || 0);

  if (inputValueBig.lte(0)) {
    return defaultLongOptionReader;
  }

  const inputAmount = inputValueBig.mul(collateralToken.tokenDivisor).round();

  const availableForBorrow = inputAmount.mul(collateralPrice).mul(loanToValue);

  let left = 0;
  let right = 100;
  let mid = 0;
  let depth = 0;
  let LPToBorrowValue = new Big(0);

  const minToReceiveLPValue = await quoterContract.callStatic
    .quoteExactInputSingle(
      basicVaultAddress,
      collateralTokenAddress,
      500,
      inputAmount.toString(),
      0
    )
    .then(convertToBig);

  while (left <= right) {
    depth += 1;
    mid = Math.floor((left + right) / 2);

    const bestLPToBorrowAmount = availableForBorrow
      .div(1 - loanToValue)
      .div(debtTokenPrice)
      .mul(100 - mid)
      .div(100)
      .round();

    try {
      // eslint-disable-next-line no-await-in-loop
      await longVaultPositionManagerContract.callStatic.depositAndOpenBySwapOptionPosition(
        collateralTokenAddress,
        inputAmount.toString(),
        lendingPoolAddress,
        basicVaultAddress,
        bestLPToBorrowAmount.toString(),
        minToReceiveLPValue.toString()
      );

      // console.log(`Succeeded for ${mid}`);

      LPToBorrowValue = bestLPToBorrowAmount;

      if (depth > 5) {
        break;
      }

      right = mid - 1;
    } catch {
      // console.log(`Failed for ${mid}`);
      left = mid + 1;
    }
  }

  const swapLeverage = LPToBorrowValue.mul(basicVault.valuePerLP)
    .div(inputAmount)
    .toNumber();

  return {
    inputValue,
    LPToBorrowValue,
    minToReceiveLPValue,
    swapLeverage,
  };
};
