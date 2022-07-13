import { BasicModalStateProvider } from "../providers/BasicModalStateProvider";
import { BasicModalMutationsProvider } from "../providers/BasicModalMutationsProvider";

import { ModalContent } from "./ModalContent";

export const BasicVaultModal = () => (
  <BasicModalStateProvider>
    <BasicModalMutationsProvider>
      <ModalContent />
    </BasicModalMutationsProvider>
  </BasicModalStateProvider>
);
