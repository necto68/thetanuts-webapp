import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

export type Web3ModalContextData = {
  web3Modal: Web3Modal;
};

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "INFURA_ID", // required
    },
  },
};

export const web3ModalConfig = { providerOptions, theme: "dark" };
