import { AnimatePresence } from "framer-motion";

import { ContentAnimatedContainer } from "../../index-vault-modal/components/ModalContent.styles";
import { useLongModalMutations } from "../../long-vault-modal/hooks";

import { LongOptionPositionModalPendingMutationContent } from "./LongOptionPositionModalPendingMutationContent";
import { LongOptionPositionModalContent } from "./LongOptionPositionModalContent";
import { Container } from "./ModalContent.styles";

export const ModalContent = () => {
  const { mutationHash } = useLongModalMutations();

  const isShowPendingMutation = Boolean(mutationHash);

  return (
    <Container>
      <AnimatePresence exitBeforeEnter>
        <ContentAnimatedContainer>
          {isShowPendingMutation ? (
            <LongOptionPositionModalPendingMutationContent />
          ) : (
            <LongOptionPositionModalContent />
          )}
        </ContentAnimatedContainer>
      </AnimatePresence>
    </Container>
  );
};
