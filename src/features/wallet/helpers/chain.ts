import type { Web3Provider } from "@ethersproject/providers";

import type { ChainId } from "../constants";
import { chainsMap } from "../constants";

export const switchToChain = async (
  chainId: ChainId,
  provider: Web3Provider | undefined
) => {
  const chainIdHex = `0x${chainId.toString(16)}`;
  console.log(chainId)
  try {
    await provider?.send("wallet_switchEthereumChain", [
      {
        chainId: chainIdHex,
      },
    ]);
  } catch (error: unknown) {
    const { code } = error as { code: number };

    if (code === 4902) {
      const chainConfig = chainsMap[chainId];
      const { title, symbol, urls } = chainConfig;

      await provider?.send("wallet_addEthereumChain", [
        {
          chainId: chainIdHex,
          chainName: title,

          nativeCurrency: {
            name: symbol,
            symbol,
            decimals: 18,
          },

          rpcUrls: [urls.rpc],
          blockExplorerUrls: [urls.explorer],
        },
      ]);
    }
  }
};
