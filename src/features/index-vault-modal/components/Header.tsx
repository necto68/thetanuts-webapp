import {
  Container,
  Title,
  CloseButton,
  CloseButtonWrapper,
} from "./Header.styles";

export const Header = () => (
  <Container>
    <Title>Swap Token</Title>
    <CloseButtonWrapper>
      <CloseButton>X</CloseButton>
    </CloseButtonWrapper>
  </Container>
);
