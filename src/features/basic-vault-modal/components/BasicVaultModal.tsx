import { BasicModalStateProvider } from "../providers/BasicModalStateProvider";
import { BoostModalMutationsProvider } from "../../boost/providers/BoostModalMutationsProvider";
import { BasicModalMutationsProvider } from "../providers/BasicModalMutationsProvider";

import { ModalContent } from "./ModalContent";

export const BasicVaultModal = () => (
  <BasicModalStateProvider>
    <BasicModalMutationsProvider>
      <BoostModalMutationsProvider>
        <ModalContent />
      </BoostModalMutationsProvider>
    </BasicModalMutationsProvider>
  </BasicModalStateProvider>
);
