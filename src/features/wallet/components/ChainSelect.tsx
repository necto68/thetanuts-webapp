import type { FC } from "react";
import { useWallet } from "@gimmixorg/use-wallet";

import type { ChainId } from "../constants";
import { chains, chainsMap } from "../constants";
import { SelectOptionButton } from "../../select-option-button/components";

interface ChainSelectProps {
  chainIds?: ChainId[];
}

export const ChainSelect: FC<ChainSelectProps> = ({ chainIds }) => {
  const { provider, network } = useWallet();
  const selectedChainId: ChainId | undefined = network?.chainId;

  if (!selectedChainId) {
    return null;
  }

  const selectedChains = chainIds
    ? chainIds.map((chainId) => chainsMap[chainId])
    : chains;

  const isSelectedChainIdValid = selectedChains.some(
    ({ chainId }) => chainId === selectedChainId
  );

  const selectedChainsWithoutCurrentChain = selectedChains.filter(
    ({ chainId }) => chainId !== selectedChainId
  );

  const selectedChain =
    selectedChainId in chainsMap ? chainsMap[selectedChainId] : null;

  const buttonSymbol = selectedChain?.symbol;
  const buttonTitle = selectedChain?.title ?? "Wrong network";
  const buttonColor = isSelectedChainIdValid ? selectedChain?.color : "#EB5853";

  const switchToChain = async (chainId: ChainId) => {
    const chainIdHex = `0x${chainId.toString(16)}`;

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

  const options = selectedChainsWithoutCurrentChain.map(
    ({ chainId, title, symbol, color }) => ({
      id: chainId,
      title,
      symbol,
      color,
    })
  );

  return (
    <SelectOptionButton
      color={buttonColor}
      onOptionClick={switchToChain}
      options={options}
      symbol={buttonSymbol}
      title={buttonTitle}
    />
  );
};
