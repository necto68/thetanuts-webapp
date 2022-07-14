import { useWallet } from "@gimmixorg/use-wallet";
import { useCallback } from "react";

import { web3ModalConfig } from "../../wallet/constants";

import { ModalMainButton } from "./MainModalButton.styles";

export const ConnectWalletMainButton = () => {
  const { connect } = useWallet();

  const handleConnectWalletButtonClick = useCallback(async () => {
    await connect(web3ModalConfig);
  }, [connect]);

  return (
    <ModalMainButton
      onClick={handleConnectWalletButtonClick}
      primaryColor="#259DDF"
      secondaryColor="#ffffff"
    >
      Connect Wallet
    </ModalMainButton>
  );
};
