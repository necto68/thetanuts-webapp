import { useRef, useState } from "react";
import type { FC } from "react";
import { useWallet } from "@gimmixorg/use-wallet";

import { IconContainer } from "../../shared/components";
import type { ChainId } from "../constants";
import { chains, chainsMap } from "../constants";

import { BaseOptionsContainer } from "./BaseOptionsContainer";
import { ChainButton } from "./ChainButton";
import { ChainContainer } from "./ChainButton.styles";
import {
  Container,
  ChainsContainer,
  ChainOptionButton,
} from "./ChainSelect.styles";

interface ChainSelectProps {
  chainIds?: ChainId[];
}

export const ChainSelect: FC<ChainSelectProps> = ({ chainIds }) => {
  const [isSelectShow, setSelectShow] = useState(false);
  const chainButtonContainerReference = useRef(null);
  const { provider, network } = useWallet();
  const selectedChainId = network?.chainId;

  const selectedChains = chainIds
    ? chainIds.map((chainId) => chainsMap[chainId])
    : chains;

  const showSelect = () => {
    setSelectShow(true);
  };

  const closeSelect = () => {
    setSelectShow(false);
  };

  const switchToChain = async (chainId: number) => {
    await provider?.send("wallet_switchEthereumChain", [
      {
        chainId: `0x${chainId.toString(16)}`,
      },
    ]);

    // TODO: add try catch for adding chain to user's wallet,
    //  if they don't have it

    closeSelect();
  };

  if (!selectedChainId) {
    return null;
  }

  const selectedChainsWithoutCurrentChain = selectedChains.filter(
    ({ chainId }) => chainId !== selectedChainId
  );

  return (
    <Container>
      <div ref={chainButtonContainerReference}>
        <ChainButton onClick={showSelect} showSelect={isSelectShow} />
      </div>
      <BaseOptionsContainer
        onClose={closeSelect}
        parentRef={chainButtonContainerReference}
        show={isSelectShow}
      >
        <ChainsContainer>
          {selectedChainsWithoutCurrentChain.map(
            ({ chainId, title, color }) => {
              const LogoComponent = chainsMap[chainId].logo;

              const handleClick = async () => {
                await switchToChain(chainId);
              };

              return (
                <ChainOptionButton
                  key={chainId}
                  onClick={handleClick}
                  primaryColor={color}
                >
                  <ChainContainer>
                    <IconContainer height={25} width={25}>
                      <LogoComponent />
                    </IconContainer>
                    {title}
                  </ChainContainer>
                </ChainOptionButton>
              );
            }
          )}
        </ChainsContainer>
      </BaseOptionsContainer>
    </Container>
  );
};
