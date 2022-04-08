import { Spinner } from "../icons";

import { IconContainer } from "./IconContainer";
import { Container } from "./LoadingSpinner.styles";

export const LoadingSpinner = () => (
  <Container>
    <IconContainer height={17} width={17}>
      <Spinner />
    </IconContainer>
  </Container>
);
