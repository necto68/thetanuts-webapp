import { Container, HeaderWrapper, Header, Balance, SwapCard, DepositValueEth, DepositValueUsd, MaxButton, AssetLogo, AssetInitials, FlipButton } from "./SwapDisplay.styles"
import img from "../../../assets/images/eth-logo.png"
import { BsArrowDownUp } from "react-icons/bs"

export const SwapDisplay = () => (
    <Container>
        <HeaderWrapper>
            <Header>Pay</Header>
            <Balance>Balance: 0</Balance>
        </HeaderWrapper>
        <SwapCard>
            <DepositValueEth>1</DepositValueEth>
            <DepositValueUsd>~$2900</DepositValueUsd>
            <MaxButton>MAX</MaxButton>
            <AssetLogo src={img}/>
            <AssetInitials>ETH</AssetInitials>
        </SwapCard>
        <FlipButton><BsArrowDownUp color="white" size={ 18 }/></FlipButton>
        <HeaderWrapper>
            <Header>Receive</Header>
            <Balance>Balance: 0</Balance>
        </HeaderWrapper>
        <SwapCard>
            <DepositValueEth>1.8734</DepositValueEth>
            <DepositValueUsd>~$2900</DepositValueUsd>
            <AssetLogo src={img}/>
            <AssetInitials>tETH</AssetInitials>
        </SwapCard>
    </Container>
)