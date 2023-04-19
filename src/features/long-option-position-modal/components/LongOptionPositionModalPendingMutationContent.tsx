import { useEffect, useState } from "react";

import { PendingMutationContent } from "../../modal/components/PendingMutationContent";
import { numberFormatter } from "../../shared/helpers";
import {
  useBasicModalConfig,
  useBasicModalState,
} from "../../basic-vault-modal/hooks";
import {
  useLongModalConfig,
  useLongModalMutations,
} from "../../long-vault-modal/hooks";
import { getLongOptionTitle } from "../../table/helpers";
import { VaultType } from "../../basic-vault/types";

// eslint-disable-next-line complexity
export const LongOptionPositionModalPendingMutationContent = () => {
  const { basicVaultChainId, basicVaultQuery } = useBasicModalConfig();
  const { longVaultReaderQuery } = useLongModalConfig();
  const { inputValue, tokenData } = useBasicModalState();
  const {
    openPositionImmediatelyMutation,
    closePositionAndWithdrawMutation,
    closePositionAndWithdrawImmediatelyMutation,
    mutationHash = "",
  } = useLongModalMutations();

  const { type = VaultType.CALL, assetSymbol = "" } =
    basicVaultQuery.data ?? {};

  const { currentContractsPosition: rawCurrentContractsPosition } =
    longVaultReaderQuery.data ?? {};

  const [currentContractsPosition, setCurrentContractsPosition] = useState(
    rawCurrentContractsPosition
  );

  // we need to avoid the case where the user has already closed position
  // and currentContractsPosition === 0
  // so we need to show previous value

  useEffect(() => {
    if (rawCurrentContractsPosition?.gt(0)) {
      setCurrentContractsPosition(rawCurrentContractsPosition);
    }
  }, [rawCurrentContractsPosition]);

  const formattedCurrentPosition = currentContractsPosition
    ? numberFormatter.format(currentContractsPosition.toNumber())
    : "";

  const {
    data: openPositionImmediatelyData,
    isLoading: isOpenPositionLoading,
  } = openPositionImmediatelyMutation ?? {};
  const { data: closePositionData } = closePositionAndWithdrawMutation ?? {};
  const { data: closePositionImmediatelyData } =
    closePositionAndWithdrawImmediatelyMutation ?? {};

  const isOpenPositionMutation =
    Boolean(openPositionImmediatelyData) || isOpenPositionLoading;

  const isMutationSucceed =
    Boolean(openPositionImmediatelyData) ||
    Boolean(closePositionData) ||
    Boolean(closePositionImmediatelyData);

  const tokenSymbol = tokenData?.symbol ?? "";
  const optionTitle = getLongOptionTitle(type, assetSymbol);

  const sourceTokenData = {
    value: isOpenPositionMutation ? inputValue : formattedCurrentPosition,
    symbol: isOpenPositionMutation ? tokenSymbol : optionTitle,
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
