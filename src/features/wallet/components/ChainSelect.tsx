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

  const buttonLogo = selectedChain?.logo;
  const buttonTitle = selectedChain?.title ?? "Wrong network";
  const buttonColor = isSelectedChainIdValid ? selectedChain?.color : "#EB5853";

  const switchToChain = async (chainId: number) => {
    await provider?.send("wallet_switchEthereumChain", [
      {
        chainId: `0x${chainId.toString(16)}`,
      },
    ]);

    // TODO: add try catch for adding chain to user's wallet,
    //  if they don't have it
  };

  const options = selectedChainsWithoutCurrentChain.map(
    ({ chainId, title, logo, color }) => ({
      id: chainId,
      title,
      logo,
      color,
    })
  );

  return (
    <SelectOptionButton
      color={buttonColor}
      logo={buttonLogo}
      onOptionClick={switchToChain}
      options={options}
      title={buttonTitle}
    />
  );
};
