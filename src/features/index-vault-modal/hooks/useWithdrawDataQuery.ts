import { useQuery } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";

import { withdrawalDataFetcher } from "../helpers/withdrawDataFetcher";
import { ModalContentType } from "../types";
import { QueryType } from "../../shared/types";
import { ChainId, chainProvidersMap } from "../../wallet/constants";

import { useSwapRouterConfig } from "./useSwapRouterConfig";
import { useSwapRouterState } from "./useSwapRouterState";
import { useIndexVaultModalState } from "./useIndexVaultModalState";

export const useWithdrawDataQuery = () => {
  // Define router config data.
  const {
    indexVaultQuery,
    directWithdrawalAddress,
    directWithdrawalDeployerAddress,
  } = useSwapRouterConfig();

  // Define modal content type.
  const [{ contentType }] = useIndexVaultModalState();

  // Define user account.
  const { account = "" } = useWallet();

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
      account,
      sourceData,
      targetData,
      contentType === ModalContentType.withdrawClaim
        ? ModalContentType.withdrawClaim
        : sourceValue,
    ],

    queryFn: async () =>
      await withdrawalDataFetcher(
        provider,
        account,
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
      Boolean(account),
  });
};
