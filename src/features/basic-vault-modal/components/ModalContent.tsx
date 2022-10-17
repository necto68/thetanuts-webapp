import { AnimatePresence } from "framer-motion";

import {
  Container,
  ContentAnimatedContainer,
} from "../../index-vault-modal/components/ModalContent.styles";
import { useBasicModalMutations } from "../hooks";

import { BasicModalContent } from "./BasicModalContent";
import { BasicModalPendingMutationContent } from "./BasicModalPendingMutationContent";

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
            <BasicModalContent />
          )}
        </ContentAnimatedContainer>
      </AnimatePresence>
    </Container>
  );
};
