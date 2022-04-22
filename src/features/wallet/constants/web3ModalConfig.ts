import type Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { chains } from "./chains";

const rpc = Object.fromEntries(
  chains.map(({ chainId, urls }) => [chainId, urls.rpc])
);

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,

    options: {
      rpc,
    },
  },
};

export interface Web3ModalContextData {
  web3Modal: Web3Modal;
}

export const web3ModalConfig = {
  providerOptions,
  theme: "dark",
  cacheProvider: true,
};
