import { AnimatePresence } from "framer-motion";

import { ContentAnimatedContainer } from "../../index-vault-modal/components/ModalContent.styles";
import { BasicModalPendingMutationContent } from "../../basic-vault-modal/components";
import { useBasicModalMutations } from "../../basic-vault-modal/hooks";

import { Container } from "./ModalContent.styles";
import { DegenModalContent } from "./DegenModalContent";

export const ModalContent = () => {
  const { mutationHash } = useBasicModalMutations();

  const isShowPendingMutation = Boolean(mutationHash);

  return (
    <Container>
      <AnimatePresence exitBeforeEnter>
        <ContentAnimatedContainer>
          {isShowPendingMutation ? (
            <BasicModalPendingMutationContent />
          ) : (
            <DegenModalContent />
          )}
        </ContentAnimatedContainer>
      </AnimatePresence>
    </Container>
  );
};
