import { Separator } from "../../long-option-modal/components/LongOptionModal.styles";
import { links } from "../../shared/constants";

import { Container, Title, LinksContainer, Link } from "./Links.styles";

export const Links = () => (
  <Container>
    <Title>Useful Links</Title>
    <Separator />
    <LinksContainer>
      <Link href={links.docs}>Docs</Link>
      <Link href={links.discord}>Discord</Link>
    </LinksContainer>
  </Container>
);
