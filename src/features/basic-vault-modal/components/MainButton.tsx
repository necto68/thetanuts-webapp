import { useWallet } from "@gimmixorg/use-wallet";
import { useCallback } from "react";

import { BaseSwapButton } from "../../index-vault-modal/components/SwapButton.styles";
import { web3ModalConfig } from "../../wallet/constants";
import { useBasicModalState } from "../hooks";
import { TabType } from "../types";

// TODO: refactor this component to several buttons/components
// TODO: rename BaseSwapButton to ModalMainButton
export const MainButton = () => {
  const { tabType } = useBasicModalState();
  const { account, connect } = useWallet();

  const handleConnectWalletButtonClick = useCallback(async () => {
    await connect(web3ModalConfig);
  }, [connect]);

  if (!account) {
    return (
      <BaseSwapButton
        onClick={handleConnectWalletButtonClick}
        primaryColor="#259DDF"
        secondaryColor="#ffffff"
      >
        Connect Wallet
      </BaseSwapButton>
    );
  }

  if (tabType === TabType.deposit) {
    return (
      <BaseSwapButton primaryColor="#12CC86" secondaryColor="#ffffff">
        Deposit
      </BaseSwapButton>
    );
  }

  return (
    <BaseSwapButton primaryColor="#12CC86" secondaryColor="#ffffff">
      Initiate Withdraw
    </BaseSwapButton>
  );
};
