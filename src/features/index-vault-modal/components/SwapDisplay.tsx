import {
  Container,
  HeaderWrapper,
  Header,
  Balance,
  SwapCard,
  DepositValueEth,
  DepositValueUsd,
  Wrapper,
  MaxButton,
  AssetInitials,
  FlipButton,
  FlipButtonWrapper,
} from "./SwapDisplay.styles";

export const SwapDisplay = () => (
  <Container>
    <HeaderWrapper>
      <Header>Pay</Header>
      <Balance>Balance: 0</Balance>
    </HeaderWrapper>
    <SwapCard>
      <Wrapper>
        <DepositValueEth>1</DepositValueEth>
        <DepositValueUsd>~$2900</DepositValueUsd>
      </Wrapper>
      <Wrapper>
        <MaxButton>MAX</MaxButton>
        <AssetInitials>ETH</AssetInitials>
      </Wrapper>
    </SwapCard>
    <FlipButtonWrapper>
      <FlipButton />
    </FlipButtonWrapper>
    <HeaderWrapper>
      <Header>Receive</Header>
      <Balance>Balance: 0</Balance>
    </HeaderWrapper>
    <SwapCard>
      <Wrapper>
        <DepositValueEth>1.8734</DepositValueEth>
        <DepositValueUsd>~$2900</DepositValueUsd>
      </Wrapper>
      <Wrapper>
        <AssetInitials>tETH</AssetInitials>
      </Wrapper>
    </SwapCard>
  </Container>
);
