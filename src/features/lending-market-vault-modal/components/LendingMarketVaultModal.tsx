import { BasicModalStateProvider } from "../../basic-vault-modal/providers/BasicModalStateProvider";
import { BasicModalMutationsProvider } from "../../basic-vault-modal/providers/BasicModalMutationsProvider";
import { LendingMarketModalMutationsProvider } from "../providers/LendingMarketModalMutationsProvider";

import { ModalContent } from "./ModalContent";

export const LendingMarketVaultModal = () => (
  <BasicModalStateProvider>
    <BasicModalMutationsProvider>
      <LendingMarketModalMutationsProvider>
        <ModalContent />
      </LendingMarketModalMutationsProvider>
    </BasicModalMutationsProvider>
  </BasicModalStateProvider>
);
