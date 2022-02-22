import type { FC } from "react";
import { useWallet } from "@gimmixorg/use-wallet";

import { BaseButton, IconContainer, ArrowIcon } from "../../shared/components";
import type { ChainId } from "../constants";
import { chainsMap } from "../constants";

import { ChainContainer } from "./ChainButton.styles";

interface ChainButtonProps {
  onClick: () => void;
  showSelect: boolean;
}

export const ChainButton: FC<ChainButtonProps> = ({ onClick, showSelect }) => {
  const { network } = useWallet();
  const chainId: ChainId | undefined = network?.chainId;

  const selectedChain =
    chainId && chainId in chainsMap ? chainsMap[chainId] : null;
  const LogoComponent =
    chainId && chainId in chainsMap ? chainsMap[chainId].logo : null;

  return selectedChain ? (
    <BaseButton onClick={onClick} primaryColor={selectedChain.color}>
      <ChainContainer>
        {LogoComponent ? (
          <IconContainer height={25} width={25}>
            <LogoComponent />
          </IconContainer>
        ) : null}
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
