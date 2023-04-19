import { TabType } from "../../basic-vault-modal/types";
import { useVaultModalState } from "../../modal/hooks";

import { OpenPositionModalContent } from "./OpenPositionModalContent";

export const LongOptionPositionModalContent = () => {
  const [{ tabType }] = useVaultModalState();

  return tabType === TabType.deposit ? <OpenPositionModalContent /> : null;
};
