import { useCallback } from "react";

import { useWallet } from "../../wallet/hooks/useWallet";

import { ModalMainButton } from "./ModalMainButton.styles";

export const ConnectWalletMainButton = () => {
  const { connect } = useWallet();

  const handleConnectWalletButtonClick = useCallback(async () => {
    await connect();
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
