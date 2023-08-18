/* eslint-disable no-nested-ternary */
import { AnimatePresence } from "framer-motion";

import { useVaultModalState } from "../../modal/hooks";
import {
  Container,
  ContentAnimatedContainer,
} from "../../index-vault-modal/components/ModalContent.styles";
import { useBasicModalMutations } from "../hooks";
import { useBoostModalMutations } from "../../boost/hooks";
import { BoostModalContent } from "../../boost/components/BoostModalContent";
import { BoostModalPendingMutationContent } from "../../boost/components/BoostModalPendingMutationContent";

import { BasicModalContent } from "./BasicModalContent";
import { BasicModalPendingMutationContent } from "./BasicModalPendingMutationContent";

export const ModalContent = () => {
  const { mutationHash } = useBasicModalMutations();
  const { boostHash } = useBoostModalMutations();
  const [vaultModalState] = useVaultModalState();
  const { isBoostContentShown } = vaultModalState;

  const isShowPendingMutation = Boolean(mutationHash);
  const isShowPendingBoostMutation = Boolean(boostHash);

  return (
    <Container>
      <AnimatePresence exitBeforeEnter>
        <ContentAnimatedContainer>
          {/* {isBoostContentShown ? (
            isShowPendingBoostMutation ? (
              <BoostModalPendingMutationContent />
            ) : (
              <BoostModalContent />
            )
          ) : isShowPendingMutation ? (
            <BasicModalPendingMutationContent />
          ) : (
            <BasicModalContent />
          )} */}
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
