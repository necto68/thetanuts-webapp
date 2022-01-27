import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useWallet } from '@gimmixorg/use-wallet';
import { BaseButton, IconContainer } from '../../shared/components';
import { chains, chainLogosMap } from '../constants';
import { BaseOptionsContainer } from './BaseOptionsContainer';
import { ChainButton, ChainContainer } from './ChainButton';

export const ChainsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: #ffffff;
  background-color: #010c1a;
`;

const ChainOptionButton = styled(BaseButton)`
  border: none;
  box-shadow: none !important;
  border-radius: 0;
  border-bottom: 1px solid #9c9c9c;
`;

export const ChainSelect = () => {
  const [isSelectShow, setSelectShow] = useState(false);
  const chainButtonContainerRef = useRef(null);
  const { provider, network } = useWallet();
  const selectedChainId = network?.chainId;

  const showSelect = () => {
    setSelectShow(true);
  };

  const closeSelect = () => {
    setSelectShow(false);
  };

  const switchToChain = async (chainId: number) => {
    await provider?.send('wallet_switchEthereumChain', [
      {
        chainId: `0x${chainId.toString(16)}`,
      },
    ]);

    // TODO: add try catch for adding chain to user's wallet, if he doesnt have it

    closeSelect();
  };

  if (!selectedChainId) {
    return null;
  }

  const chainOptions = chains.filter(
    ({ chainId }) => chainId !== selectedChainId,
  );

  return (
    <>
      <div ref={chainButtonContainerRef}>
        <ChainButton onClick={showSelect} showSelect={isSelectShow} />
      </div>
      <BaseOptionsContainer
        show={isSelectShow}
        parentRef={chainButtonContainerRef}
        onClose={closeSelect}
      >
        <ChainsContainer>
          {chainOptions.map(({ chainId, title, color }) => {
            const LogoComponent = chainLogosMap[chainId];

            const handleClick = () => {
              switchToChain(chainId).then();
            };

            return (
              <ChainOptionButton
                key={chainId}
                onClick={handleClick}
                primaryColor={color}
              >
                <ChainContainer>
                  <IconContainer width={25} height={25}>
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
