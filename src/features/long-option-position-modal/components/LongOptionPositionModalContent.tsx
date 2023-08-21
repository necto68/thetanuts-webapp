import { useVaultModalState } from "../../modal/hooks";
import { ModalContentType } from "../../index-vault-modal/types";
import { ClosePositionModalStateProvider } from "../providers/ClosePositionModalStateProvider";

import { OpenPositionModalContent } from "./OpenPositionModalContent";
import { ClosePositionModalContent } from "./ClosePositionModalContent";

export const LongOptionPositionModalContent = () => {
  const [{ contentType }] = useVaultModalState();

  return contentType === ModalContentType.openLongOptionPosition ? (
    <OpenPositionModalContent />
  ) : (
    <ClosePositionModalStateProvider>
      <ClosePositionModalContent />
    </ClosePositionModalStateProvider>
  );
};
