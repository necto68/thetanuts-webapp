import { useEffect, useState } from "react";

import { PendingMutationContent } from "../../modal/components/PendingMutationContent";
import { numberFormatter } from "../../shared/helpers";
import {
  useBasicModalConfig,
  useBasicModalState,
} from "../../basic-vault-modal/hooks";
import {
  useLendingMarketModalConfig,
  useLendingMarketModalMutations,
} from "../hooks";
import { getLongVaultContractsTitle } from "../../table/helpers";
import { VaultType } from "../../basic-vault/types";

// eslint-disable-next-line complexity
export const LendingMarketModalPendingMutationContent = () => {
  const { basicVaultChainId, basicVaultQuery } = useBasicModalConfig();
  const { lendingMarketVaultReaderQuery } = useLendingMarketModalConfig();
  const { inputValue, tokenData } = useBasicModalState();
  const {
    openPositionMutation,
    closePositionAndWithdrawMutation,
    mutationHash = "",
  } = useLendingMarketModalMutations();

  const {
    type = VaultType.CALL,
    assetSymbol = "",
    collateralSymbol = "",
  } = basicVaultQuery.data ?? {};

  const { currentPosition: rawCurrentPosition } =
    lendingMarketVaultReaderQuery.data ?? {};

  const [currentPosition, setCurrentPosition] = useState(rawCurrentPosition);

  // we need to avoid the case where the user has already closed position
  // and currentPosition === 0
  // so we need to show previous value

  useEffect(() => {
    if (rawCurrentPosition?.gt(0)) {
      setCurrentPosition(rawCurrentPosition);
    }
  }, [rawCurrentPosition]);

  const formattedCurrentPosition = currentPosition
    ? numberFormatter.format(currentPosition.toNumber())
    : "";

  const { data: openPositionData, isLoading: isOpenPositionLoading } =
    openPositionMutation ?? {};
  const { data: closePositionData } = closePositionAndWithdrawMutation ?? {};

  const isOpenPositionMutation =
    Boolean(openPositionData) || isOpenPositionLoading;

  const isMutationSucceed =
    Boolean(openPositionData) || Boolean(closePositionData);

  const tokenSymbol = tokenData?.symbol ?? "";
  const contractsTitle = getLongVaultContractsTitle(
    type,
    assetSymbol,
    collateralSymbol
  );

  const sourceTokenData = {
    value: isOpenPositionMutation ? inputValue : formattedCurrentPosition,
    symbol: isOpenPositionMutation ? tokenSymbol : contractsTitle,
  };

  const pendingTitle = isOpenPositionMutation
    ? "Opening Position..."
    : "Closing Position...";
  const successTitle = isOpenPositionMutation
    ? "Open Position Successful"
    : "Close Position Successful";

  return (
    <PendingMutationContent
      chainId={basicVaultChainId}
      isMutationSucceed={isMutationSucceed}
      mutationHash={mutationHash}
      pendingTitle={pendingTitle}
      sourceTokenData={sourceTokenData}
      successTitle={successTitle}
    />
  );
};
