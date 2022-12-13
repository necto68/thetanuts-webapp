import { BasicModalStateProvider } from "../../basic-vault-modal/providers/BasicModalStateProvider";
import { BasicModalMutationsProvider } from "../../basic-vault-modal/providers/BasicModalMutationsProvider";
import { LongModalMutationsProvider } from "../providers/LongModalMutationsProvider";

import { ModalContent } from "./ModalContent";

export const LongVaultModal = () => (
  <BasicModalStateProvider>
    <BasicModalMutationsProvider>
      <LongModalMutationsProvider>
        <ModalContent />
      </LongModalMutationsProvider>
    </BasicModalMutationsProvider>
  </BasicModalStateProvider>
);
