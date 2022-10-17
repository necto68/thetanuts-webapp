import type { Provider } from "@ethersproject/providers";
import Big from "big.js";

import { BasicVaultReaderAbi__factory as BasicVaultReaderAbiFactory } from "../../contracts/types";
import { convertToBig, queryClient } from "../../shared/helpers";
import { QueryType } from "../../shared/types";
import { basicVaultsMap } from "../../basic/constants";
import type { BasicVaultReader } from "../types";
import type { BasicVaultType } from "../../basic/types";

import { basicVaultFetcher } from "./basicVaultFetcher";

const defaultBasicVaultReader: BasicVaultReader = {
  totalPosition: null,
  currentPosition: null,
  depositPending: null,
  withdrawalPending: null,
  queuedExitEpoch: null,
};

export const basicVaultReaderFetcher = async (
  basicVaultId: string,
  basicVaultType: BasicVaultType,
  basicVaultAddress: string,
  basicVaultReaderAddress: string,
  account: string,
  provider: Provider
): Promise<BasicVaultReader> => {
  if (!account) {
    return defaultBasicVaultReader;
  }

  const chainId = basicVaultsMap[basicVaultId]?.source.chainId ?? 0;

  const basicVaultReaderContract = BasicVaultReaderAbiFactory.connect(
    basicVaultReaderAddress,
    provider
  );

  const [basicVault, vaultPosition] = await Promise.all([
    queryClient.fetchQuery(
      [QueryType.basicVault, basicVaultId, basicVaultType, chainId],

      async () =>
        await basicVaultFetcher(
          basicVaultId,
          basicVaultType,
          basicVaultAddress,
          provider
        )
    ),
    basicVaultReaderContract
      .myVaultPosition(basicVaultAddress, { from: account })
      .then((values) => values.map(convertToBig)),
  ]);

  const { collateralDecimals, epoch } = basicVault;

  const collateralTokenDivisor = new Big(10).pow(collateralDecimals);

  const queuedExitEpoch = vaultPosition[5].toNumber();

  const [
    depositPending,
    withdrawalPending,
    totalPosition,
    totalPositionWithoutWithdrawal,
  ] = [
    vaultPosition[0],
    vaultPosition[2],
    vaultPosition[6],
    vaultPosition[7],
  ].map((value) => value.div(collateralTokenDivisor));

  const currentPosition =
    epoch > queuedExitEpoch ? totalPositionWithoutWithdrawal : totalPosition;

  return {
    totalPosition,
    currentPosition,
    depositPending,
    withdrawalPending,
    queuedExitEpoch,
  };
};
