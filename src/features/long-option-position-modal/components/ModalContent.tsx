import { AnimatePresence } from "framer-motion";

import { ContentAnimatedContainer } from "../../index-vault-modal/components/ModalContent.styles";
import { LongModalPendingMutationContent } from "../../long-vault-modal/components";
import { useLongModalMutations } from "../../long-vault-modal/hooks";

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
            <LongModalPendingMutationContent />
          ) : (
            <LongOptionPositionModalContent />
          )}
        </ContentAnimatedContainer>
      </AnimatePresence>
    </Container>
  );
};
