import { BasicModalStateProvider } from "../providers/BasicModalStateProvider";

import { ModalContent } from "./ModalContent";

export const BasicVaultModal = () => (
  <BasicModalStateProvider>
    <ModalContent />
  </BasicModalStateProvider>
);
