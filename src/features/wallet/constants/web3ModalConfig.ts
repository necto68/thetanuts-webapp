import { init } from "@web3-onboard/react";
import injectedModule, { ProviderLabel } from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
import coinbaseWalletModule from "@web3-onboard/coinbase";

import { chains } from "./chains";

const rpc = chains.map(({ chainId, urls }) => ({
  id: `0x${chainId.toString(16)}`,
  rpcUrl: urls.rpc,
}));

const chainArray = chains.map(({ chainId }) => chainId);

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule({
  version: 2,
  handleUri: (uri) => {
    console.log(uri);
    return Promise.resolve();
  },
  projectId: "800f916e0fe9421fb73c01c96cdda221",
  requiredChains: chainArray,
});

const injected = injectedModule({
  displayUnavailable: [ProviderLabel.OKXWallet]
})

const wallets = [injected, coinbaseWalletSdk, walletConnect];

export const web3Onboard = init({
  wallets,
  chains: rpc,
  theme: "dark",
  appMetadata: {
    name: "Thetanuts Finance",
    icon: 'https://www.thetanuts.finance/images/landing-page/logo-thetanuts-2.svg',
    logo: 'https://www.thetanuts.finance/images/landing-page/logo-thetanuts-2.svg',
    description: "Thetanuts Finance",
  },
  connect: {
    removeWhereIsMyWalletWarning: true,
    showSidebar: false,
  },
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  }
});
