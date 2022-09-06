import type { FC } from "react";
import { useWallet } from "@gimmixorg/use-wallet";

import type { ChainId } from "../constants";
import { chainIconSymbols, chains, chainsMap } from "../constants";
import { SelectOptionButton } from "../../select-option-button/components";
import { switchToChain } from "../helpers";

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
        void switchToChain(id, provider);
      }}
      options={options}
      symbol={buttonSymbol}
      title={buttonTitle}
    />
  );
};
