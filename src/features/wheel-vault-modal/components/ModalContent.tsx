import { AnimatePresence } from "framer-motion";

import {
  Container,
  ContentAnimatedContainer,
} from "../../index-vault-modal/components/ModalContent.styles";
import { BasicModalPendingMutationContent } from "../../basic-vault-modal/components";
import { useBasicModalMutations } from "../../basic-vault-modal/hooks";

import { WheelModalContent } from "./WheelModalContent";

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
            <WheelModalContent />
          )}
        </ContentAnimatedContainer>
      </AnimatePresence>
    </Container>
  );
};
