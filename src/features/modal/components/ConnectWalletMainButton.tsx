import { useCallback } from "react";
import { useConnectWallet } from "@web3-onboard/react";

import { ModalMainButton } from "./ModalMainButton.styles";

export const ConnectWalletMainButton = () => {
  const [, connect] = useConnectWallet();

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
