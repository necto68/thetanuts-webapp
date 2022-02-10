import { Container, RatioText, TextWrapper, TextLeft, TextRight, TextLeftUnderline } from "./InformationDisplay.styles"

export const InformationDisplay = () => (
    <Container>
         <RatioText>1 ETH = 0.9713 tETH ($2000)</RatioText>
            <TextWrapper>
                <TextLeft>Protocols</TextLeft>
                <TextRight>Uniswap v2</TextRight>
            </TextWrapper>
            <TextWrapper>
                <TextLeft>Route</TextLeft>
                <TextRight>ETH - tETH</TextRight>
            </TextWrapper>
            <TextWrapper>
                <TextLeft>Slippage Tolerance</TextLeft>
                <TextRight>0.5%</TextRight>
            </TextWrapper>
            <TextWrapper>
                <TextLeftUnderline>Platform fee</TextLeftUnderline>
                <TextRight>0.3%</TextRight>
            </TextWrapper>
    </Container>
)