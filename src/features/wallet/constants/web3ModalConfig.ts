import type Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    // required
    package: WalletConnectProvider,

    options: {
      // required
      infuraId: "INFURA_ID",
    },
  },
};

export interface Web3ModalContextData {
  web3Modal: Web3Modal;
}

export const web3ModalConfig = { providerOptions, theme: "dark" };
