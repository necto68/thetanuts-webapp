import {
  Container,
  Title,
  SubTitle,
  Input,
  InputContainer,
} from "./PositionInput.styles";

export const PositionInput = () => (
  <Container>
    <Title>Position</Title>
    <InputContainer>
      <Input isError={false} />
    </InputContainer>
    <SubTitle>Available: XX.XX</SubTitle>
  </Container>
);
