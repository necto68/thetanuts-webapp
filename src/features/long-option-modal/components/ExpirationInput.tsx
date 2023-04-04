import {
  Container,
  Title,
  Input,
  InputContainer,
} from "./CollateralInput.styles";

export const ExpirationInput = () => (
  <Container>
    <Title>Expiration</Title>
    <InputContainer>
      <Input isError={false} />
    </InputContainer>
  </Container>
);
