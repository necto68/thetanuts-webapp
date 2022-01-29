import type { FC } from "react";
import { useWallet } from "@gimmixorg/use-wallet";

import { BaseButton, IconContainer, ArrowIcon } from "../../shared/components";
import { chainsMap, chainLogosMap } from "../constants";

import { ChainContainer } from "./ChainButton.styles";

interface ChainButtonProps {
  onClick: () => void;
  showSelect: boolean;
}

export const ChainButton: FC<ChainButtonProps> = ({ onClick, showSelect }) => {
  const { network } = useWallet();
  const chainId = network?.chainId;

  const selectedChain = chainId ? chainsMap[chainId] : null;
  const LogoComponent = chainId ? chainLogosMap[chainId] : () => null;

  return selectedChain ? (
    <BaseButton onClick={onClick} primaryColor={selectedChain.color}>
      <ChainContainer>
        <IconContainer height={25} width={25}>
          <LogoComponent />
        </IconContainer>
        {selectedChain.title}
        <ArrowIcon up={showSelect} />
      </ChainContainer>
    </BaseButton>
  ) : (
    <BaseButton onClick={onClick} primaryColor="#ff0000">
      Wrong network
    </BaseButton>
  );
};
