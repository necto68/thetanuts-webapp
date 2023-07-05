import type { FC } from "react";
import { useConnectWallet } from "@web3-onboard/react";

import type { ChainId } from "../constants";
import { chainIconSymbols, chains, chainsMap } from "../constants";
import { SelectOptionButton } from "../../select-option-button/components";
import { switchToChain } from "../helpers";
import { ethers } from 'ethers'
interface ChainSelectProps {
  chainIds?: ChainId[];
}

export const ChainSelect: FC<ChainSelectProps> = ({ chainIds }) => {
  const [{ wallet }] = useConnectWallet();
  const currentChainId = parseInt(wallet?.chains?.[0]?.id ?? "0", 16);
  const walletProvider = wallet?.provider ? new ethers.providers.Web3Provider(wallet.provider as any) : undefined;

  const selectedChainId: ChainId | undefined = currentChainId;

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

  const buttonSymbol = selectedChain
    ? chainIconSymbols[selectedChain.chainId]
    : undefined;
  const buttonTitle = selectedChain?.title ?? "Wrong network";
  const buttonColor = isSelectedChainIdValid ? "#FFFFFF" : "#EB5853";

  const options = selectedChainsWithoutCurrentChain.map(
    ({ chainId, title }) => ({
      id: chainId,
      title,
      symbol: chainIconSymbols[chainId],
    })
  );

  return (
    <SelectOptionButton
      color={buttonColor}
      onOptionClick={(id) => {
        void switchToChain(id, walletProvider);
      }}
      options={options}
      symbol={buttonSymbol}
      title={buttonTitle}
    />
  );
};
