import { FC } from 'react';
import styled from 'styled-components';
import { useWallet } from '@gimmixorg/use-wallet';
import { BaseButton } from '../../shared/components';
import { IconContainer } from '../../shared/components';
import { ArrowIcon } from '../../shared/components';
import { chainsMap, chainLogosMap } from '../constants';

export const ChainContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

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
        <IconContainer width={25} height={25}>
          <LogoComponent />
        </IconContainer>
        {selectedChain.title}
        <ArrowIcon up={showSelect} />
      </ChainContainer>
    </BaseButton>
  ) : (
    <BaseButton primaryColor={'#ff0000'} onClick={onClick}>
      {'Wrong network'}
    </BaseButton>
  );
};
