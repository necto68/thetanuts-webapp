import type { Provider } from "@ethersproject/providers";
import Big from "big.js";

import {
  BasicVaultAbi__factory as BasicVaultAbiFactory,
  BasicVaultReaderAbi__factory as BasicVaultReaderAbiFactory,
} from "../../contracts/types";
import { convertToBig, queryClient } from "../../shared/helpers";
import { QueryType } from "../../shared/types";
import { basicVaultsMap } from "../../basic/constants";
import type { BasicVaultReader } from "../types";
import type { BasicVaultType } from "../../basic/types";
import { ChainId, chainsMap } from "../../wallet/constants";
import { VaultStatus } from "../../basic-vault-modal/types";
import { getVaultStatus } from "../../degen-vault-modal/helpers/utils";

import { basicVaultFetcher } from "./basicVaultFetcher";

const defaultBasicVaultReader: BasicVaultReader = {
  lpBalance: null,
  totalPosition: null,
  currentPosition: null,
  depositPending: null,
  withdrawalPending: null,
  isReadyToWithdraw: false,
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

  const chainId =
    basicVaultsMap[basicVaultId]?.source.chainId ?? ChainId.ETHEREUM;
  const { basicVaultDepositorAddress } = chainsMap[chainId].addresses;

  const basicVaultContract = BasicVaultAbiFactory.connect(
    basicVaultAddress,
    provider
  );

  const basicVaultReaderContract = BasicVaultReaderAbiFactory.connect(
    basicVaultReaderAddress,
    provider
  );

  const lpDivisor = new Big(10).pow(18);
  const zeroBig = new Big(0);

  const [basicVault, lpBalance, vaultPosition] = await Promise.all([
    queryClient.fetchQuery(
      [QueryType.basicVault, basicVaultId, basicVaultType, chainId],

      async () =>
        await basicVaultFetcher(
          basicVaultId,
          basicVaultType,
          basicVaultAddress,
          provider,
          basicVaultDepositorAddress
        )
    ),
    basicVaultContract
      .balanceOf(account)
      .then(convertToBig)
      .then((lpBalanceBig) => lpBalanceBig.div(lpDivisor)),
    basicVaultReaderContract
      .myVaultPosition(basicVaultAddress, {
        from: account,
      })
      .then((values) => values.map(convertToBig))
      .catch(() => [
        zeroBig,
        zeroBig,
        zeroBig,
        zeroBig,
        zeroBig,
        zeroBig,
        zeroBig,
        zeroBig,
      ]),
  ]);

  const {
    collateralDecimals,
    epoch,
    expiry,
    percentageYields: { periodPercentageYield },
    isSettled,
    isExpired,
    isAllowInteractions,
  } = basicVault;

  const vaultStatus = getVaultStatus(isSettled, isExpired, isAllowInteractions);
  const vaultStatusesWithUpdatedCurrentPosition = [
    VaultStatus.SETTLEMENT,
    VaultStatus.ACTIVE_EPOCH,
  ];

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

  const isReadyToWithdraw =
    queuedExitEpoch > 0 && (epoch > queuedExitEpoch || expiry === 0);

  let currentPosition = isReadyToWithdraw
    ? totalPositionWithoutWithdrawal
    : totalPosition;

  if (vaultStatusesWithUpdatedCurrentPosition.includes(vaultStatus)) {
    currentPosition = currentPosition.div(1 + periodPercentageYield / 100);
  }

  return {
    lpBalance,
    totalPosition,
    currentPosition,
    depositPending,
    withdrawalPending,
    isReadyToWithdraw,
  };
};
