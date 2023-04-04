import {
  Container,
  Title,
  Input,
  InputContainer,
} from "./CollateralInput.styles";

export const StrikePriceInput = () => (
  <Container>
    <Title>Strike Prices</Title>
    <InputContainer>
      <Input isError={false} />
    </InputContainer>
  </Container>
);
