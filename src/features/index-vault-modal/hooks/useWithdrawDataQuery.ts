import { useQuery } from "react-query";
import { useWallet } from "../../wallet/hooks/useWallet";

import { withdrawalDataFetcher } from "../helpers/withdrawDataFetcher";
import { ModalContentType } from "../types";
import { QueryType } from "../../shared/types";
import { ChainId, chainProvidersMap } from "../../wallet/constants";
import { useVaultModalState } from "../../modal/hooks";

import { useSwapRouterConfig } from "./useSwapRouterConfig";
import { useSwapRouterState } from "./useSwapRouterState";

export const useWithdrawDataQuery = () => {
  // Define router config data.
  const {
    indexVaultQuery,
    directWithdrawalAddress,
    directWithdrawalDeployerAddress,
  } = useSwapRouterConfig();

  // Define modal content type.
  const [{ contentType }] = useVaultModalState();

  // Define user account.

  const { wallet, walletAddress } = useWallet();

  // Define vault query data.
  const { data } = indexVaultQuery;

  // Define vault properties.
  const { vaults = [], chainId = ChainId.ETHEREUM } = data ?? {};

  // Define swap router state.
  const { sourceData, targetData, sourceValue } = useSwapRouterState();

  //  Define provider.
  const provider = chainProvidersMap[chainId];

  return useQuery({
    queryKey: [
      QueryType.directWithdrawData,
      directWithdrawalAddress,
      walletAddress,
      sourceData,
      targetData,
      contentType === ModalContentType.withdrawClaim
        ? ModalContentType.withdrawClaim
        : sourceValue,
    ],

    queryFn: async () =>
      await withdrawalDataFetcher(
        provider,
        walletAddress,
        sourceData,
        targetData,
        vaults,
        directWithdrawalAddress,
        directWithdrawalDeployerAddress,
        contentType !== ModalContentType.withdrawClaim
          ? sourceValue || "0"
          : undefined
      ),

    enabled:
      (contentType === ModalContentType.withdraw ||
        contentType === ModalContentType.withdrawClaim ||
        contentType === ModalContentType.withdrawSummary) &&
      Boolean(wallet),
  });
};
