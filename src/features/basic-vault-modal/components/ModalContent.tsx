import { AnimatePresence } from "framer-motion";
import { useVaultModalState } from "../../modal/hooks";

import {
  Container,
  ContentAnimatedContainer,
} from "../../index-vault-modal/components/ModalContent.styles";
import { useBasicModalMutations } from "../hooks";

import { BasicModalContent } from "./BasicModalContent";
import { BasicModalPendingMutationContent } from "./BasicModalPendingMutationContent";
import { BoostModalPendingMutationContent } from "./BoostModalPendingMutationContent";
import { BoostModalContent } from "./BoostModalContent";

export const ModalContent = () => {
  const { mutationHash, boostHash } = useBasicModalMutations();
  const [vaultModalState] = useVaultModalState();
  const { isBoostContentShown } = vaultModalState;

  const isShowPendingMutation = Boolean(mutationHash);
  const isShowPendingBoostMutation = Boolean(boostHash);

  return (
    <Container>
      <AnimatePresence exitBeforeEnter>
        <ContentAnimatedContainer>
          {isBoostContentShown ? (
            isShowPendingBoostMutation ? (
              <BoostModalPendingMutationContent />
            ) : (
              <BoostModalContent />
            )
          ) : isShowPendingMutation ? (
            <BasicModalPendingMutationContent />
          ) : (
            <BasicModalContent />
          )}
        </ContentAnimatedContainer>
      </AnimatePresence>
    </Container>
  );
};
