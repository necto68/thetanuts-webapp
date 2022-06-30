import { useQuery } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";
import Big from "big.js";

import { withdrawalDataFetcher } from "../helpers/withdrawDataFetcher";
import { ModalContentType } from "../types/modalContentType";
import { QueryType } from "../../shared/types";

import { useSwapRouterConfig } from "./useSwapRouterConfig";
import { useSwapRouterState } from "./useSwapRouterState";
import { useIndexVaultModalState } from "./useIndexVaultModalState";

export const useWithdrawDataQuery = () => {
  // Define router config data.
  const { indexVaultQuery, directWithdrawalAddress, walletProvider } =
    useSwapRouterConfig();

  // Define modal content type.
  const [{ contentType }] = useIndexVaultModalState();

  // Define user network.
  const { network } = useWallet();

  // Define vault query data.
  const { data } = indexVaultQuery;

  // Define vault properties.
  const { assetPrice = 1, middleIndexPrice = 1, vaults = [] } = data ?? {};

  // Set exchange rate.
  const exchangeRate = new Big(middleIndexPrice).div(assetPrice).round(5);

  // Define swap router state.
  const {
    sourceData,
    targetData,
    nativeData,

    isUseNativeSourceData,
    isUseNativeTargetData,
  } = useSwapRouterState();

  // Define source token data based on isUseNativeSourceData.
  const sourceTokenData = isUseNativeSourceData ? nativeData : sourceData;

  // Define target token data based on isUseNativeTargetData.
  const targetTokenData = isUseNativeTargetData ? nativeData : targetData;

  return useQuery({
    queryKey: [
      QueryType.directWithdrawData,
      directWithdrawalAddress,
      network,
      exchangeRate,
      targetTokenData,
      sourceTokenData,
    ],

    queryFn: async () =>
      await withdrawalDataFetcher(
        walletProvider,
        sourceTokenData,
        targetTokenData,
        exchangeRate,
        vaults,
        directWithdrawalAddress
      ),

    enabled:
      contentType === ModalContentType.withdraw ||
      contentType === ModalContentType.withdrawClaim ||
      contentType === ModalContentType.withdrawSummary,
  });
};
