import { BasicModalStateProvider } from "../../basic-vault-modal/providers/BasicModalStateProvider";
import { BasicModalMutationsProvider } from "../../basic-vault-modal/providers/BasicModalMutationsProvider";
import { LongModalMutationsProvider } from "../../long-vault-modal/providers/LongModalMutationsProvider";

import { ModalContent } from "./ModalContent";

export const LongOptionPositionModal = () => (
  <BasicModalStateProvider>
    <BasicModalMutationsProvider>
      <LongModalMutationsProvider>
        <ModalContent />
      </LongModalMutationsProvider>
    </BasicModalMutationsProvider>
  </BasicModalStateProvider>
);
