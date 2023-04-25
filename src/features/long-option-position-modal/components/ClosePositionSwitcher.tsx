import { useCallback } from "react";

import { Container } from "../../basic-vault-modal/components/Switcher.styles";
import { ClosePositionTabType } from "../types";
import { useClosePositionModalState } from "../hooks";

import { ClosePositionTabButton } from "./ClosePositionTabButton";

export const ClosePositionSwitcher = () => {
  const { tabType, setTabType } = useClosePositionModalState();

  const onTabButtonClick = useCallback(
    (nextTabType: ClosePositionTabType) => {
      setTabType(nextTabType);
    },
    [setTabType]
  );

  return (
    <Container>
      <ClosePositionTabButton
        currentTabType={tabType}
        onClick={onTabButtonClick}
        tabType={ClosePositionTabType.uponExpiry}
      >
        Close Upon Expiry
      </ClosePositionTabButton>
      <ClosePositionTabButton
        currentTabType={tabType}
        onClick={onTabButtonClick}
        tabType={ClosePositionTabType.now}
      >
        Close Now
      </ClosePositionTabButton>
    </Container>
  );
};
