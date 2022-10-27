import { AnimatePresence } from "framer-motion";

import {
  Container,
  ContentAnimatedContainer,
} from "../../index-vault-modal/components/ModalContent.styles";
import { useLendingMarketModalMutations } from "../hooks";

import { LendingMarketModalPendingMutationContent } from "./LendingMarketModalPendingMutationContent";
import { LendingMarketModalContent } from "./LendingMarketModalContent";

export const ModalContent = () => {
  const { mutationHash } = useLendingMarketModalMutations();

  const isShowPendingMutation = Boolean(mutationHash);

  return (
    <Container>
      <AnimatePresence exitBeforeEnter>
        <ContentAnimatedContainer>
          {isShowPendingMutation ? (
            <LendingMarketModalPendingMutationContent />
          ) : (
            <LendingMarketModalContent />
          )}
        </ContentAnimatedContainer>
      </AnimatePresence>
    </Container>
  );
};
