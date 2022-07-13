import type { Provider } from "@ethersproject/providers";
import Big from "big.js";

import { BasicVaultReaderAbi__factory as BasicVaultReaderAbiFactory } from "../../contracts/types";
import { convertToBig, queryClient } from "../../shared/helpers";
import { QueryType } from "../../shared/types";
import { basicVaultsMap } from "../../basic/constants";
import type { BasicVaultReader } from "../types";

import { basicVaultFetcher } from "./basicVaultFetcher";

const defaultBasicVaultReader: BasicVaultReader = {
  currentPosition: null,
  withdrawalPending: null,
  premiumRealized: null,
  queuedExitEpoch: null,
};

export const basicVaultReaderFetcher = async (
  basicVaultId: string,
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
      [QueryType.basicVault, basicVaultId, chainId],

      async () =>
        await basicVaultFetcher(basicVaultId, basicVaultAddress, provider)
    ),
    basicVaultReaderContract
      .myVaultPosition(basicVaultAddress, { from: account })
      .then((values) => values.map(convertToBig)),
  ]);

  const { collateralDecimals, epoch } = basicVault;

  const collateralTokenDivisor = new Big(10).pow(collateralDecimals);

  const queuedExitEpoch = vaultPosition[5].toNumber();

  const currentPositionWei =
    epoch === queuedExitEpoch ? vaultPosition[6] : vaultPosition[7];

  const currentPosition = currentPositionWei.div(collateralTokenDivisor);
  const withdrawalPending = vaultPosition[2].div(currentPositionWei);

  // TODO: replace with real value
  const premiumRealized = new Big("999999999");

  return {
    currentPosition,
    withdrawalPending,
    premiumRealized,
    queuedExitEpoch,
  };
};
