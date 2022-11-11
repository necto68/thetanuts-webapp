import { AnimatePresence } from "framer-motion";

import {
  Container,
  ContentAnimatedContainer,
} from "../../index-vault-modal/components/ModalContent.styles";
import { useLongModalMutations } from "../hooks";

import { LongModalPendingMutationContent } from "./LongModalPendingMutationContent";
import { LongModalContent } from "./LongModalContent";

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
            <LongModalContent />
          )}
        </ContentAnimatedContainer>
      </AnimatePresence>
    </Container>
  );
};
