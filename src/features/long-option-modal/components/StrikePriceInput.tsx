import {
  Container,
  Title,
  Input,
  InputContainer,
} from "./PositionInput.styles";

export const StrikePriceInput = () => (
  <Container>
    <Title>Strike Prices</Title>
    <InputContainer>
      <Input isError={false} />
    </InputContainer>
  </Container>
);
