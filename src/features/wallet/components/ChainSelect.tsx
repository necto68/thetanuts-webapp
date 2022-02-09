import { useRef, useState } from "react";
import { useWallet } from "@gimmixorg/use-wallet";

import { IconContainer } from "../../shared/components";
import { chains, chainsMap } from "../constants";

import { BaseOptionsContainer } from "./BaseOptionsContainer";
import { ChainButton } from "./ChainButton";
import { ChainContainer } from "./ChainButton.styles";
import { ChainsContainer, ChainOptionButton } from "./ChainSelect.styles";

export const ChainSelect = () => {
  const [isSelectShow, setSelectShow] = useState(false);
  const chainButtonContainerReference = useRef(null);
  const { provider, network } = useWallet();
  const selectedChainId = network?.chainId;

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
    //  if he doesnt have it

    closeSelect();
  };

  if (!selectedChainId) {
    return null;
  }

  const chainOptions = chains.filter(
    ({ chainId }) => chainId !== selectedChainId
  );

  return (
    <>
      <div ref={chainButtonContainerReference}>
        <ChainButton onClick={showSelect} showSelect={isSelectShow} />
      </div>
      <BaseOptionsContainer
        onClose={closeSelect}
        parentRef={chainButtonContainerReference}
        show={isSelectShow}
      >
        <ChainsContainer>
          {chainOptions.map(({ chainId, title, color }) => {
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
          })}
        </ChainsContainer>
      </BaseOptionsContainer>
    </>
  );
};
