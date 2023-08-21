import { AnimatePresence } from "framer-motion";

import {
  ContentAnimatedContainer,
  Container as BaseContainer,
} from "../../index-vault-modal/components/ModalContent.styles";
import { LongModalPendingMutationContent } from "../../long-vault-modal/components";
import { useLongModalMutations } from "../../long-vault-modal/hooks";

import { LongOptionPositionModalContent } from "./LongOptionPositionModalContent";
import { Container } from "./ModalContent.styles";

export const ModalContent = () => {
  const { mutationHash } = useLongModalMutations();

  const isShowPendingMutation = Boolean(mutationHash);

  if (isShowPendingMutation) {
    return (
      <BaseContainer>
        <AnimatePresence exitBeforeEnter>
          <ContentAnimatedContainer>
            <LongModalPendingMutationContent />
          </ContentAnimatedContainer>
        </AnimatePresence>
      </BaseContainer>
    );
  }

  return (
    <Container>
      <AnimatePresence exitBeforeEnter>
        <ContentAnimatedContainer>
          <LongOptionPositionModalContent />
        </ContentAnimatedContainer>
      </AnimatePresence>
    </Container>
  );
};
