import styled from 'styled-components';
import { BaseButton } from '../../shared/components';
import { sizes } from '../../shared/constants';
import { ChainSelect, WalletButton } from '../../wallet/components';

export const Header = () => {
  return (
    <HeaderContainer>
      <ButtonsContainer>
        <BaseButton>Claim</BaseButton>
        <BaseButton>Rewards</BaseButton>
      </ButtonsContainer>
      <ButtonsContainer>
        <ChainSelect />
        <WalletButton />
      </ButtonsContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 75px;
  padding: 13px 25px;
  gap: 25px;

  @media (max-width: ${sizes.md}px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;
