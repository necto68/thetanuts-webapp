import { BasicModalStateProvider } from "../../basic-vault-modal/providers/BasicModalStateProvider";
import { BasicModalMutationsProvider } from "../../basic-vault-modal/providers/BasicModalMutationsProvider";

import { ModalContent } from "./ModalContent";

export const DegenVaultModal = () => (
  <BasicModalStateProvider>
    <BasicModalMutationsProvider>
      <ModalContent />
    </BasicModalMutationsProvider>
  </BasicModalStateProvider>
);
