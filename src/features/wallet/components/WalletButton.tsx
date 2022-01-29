import { useWallet } from "@gimmixorg/use-wallet";

import { BaseButton } from "../../shared/components";
import { web3ModalConfig } from "../constants";
import { addressFormatter } from "../../shared/helpers";

export const WalletButton = () => {
  const { account, connect, disconnect } = useWallet();

  const handleConnect = async () => {
    await connect(web3ModalConfig);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return account ? (
    <BaseButton onClick={handleDisconnect}>
      {addressFormatter(account)}
    </BaseButton>
  ) : (
    <BaseButton onClick={handleConnect}>Connect Wallet</BaseButton>
  );
};
