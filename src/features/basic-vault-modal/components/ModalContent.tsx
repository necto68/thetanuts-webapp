import { AnimatePresence } from "framer-motion";

import {
  Container,
  ContentAnimatedContainer,
} from "../../index-vault-modal/components/ModalContent.styles";

import { BasicModalContent } from "./BasicModalContent";

export const ModalContent = () => (
  <Container>
    <AnimatePresence exitBeforeEnter>
      <ContentAnimatedContainer>
        <BasicModalContent />
      </ContentAnimatedContainer>
    </AnimatePresence>
  </Container>
);
