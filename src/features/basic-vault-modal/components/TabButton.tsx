import type { FC } from "react";
import { useCallback } from "react";

import type { TabType } from "../types";
import { useVaultModalState } from "../../modal/hooks";

import { Button } from "./TabButton.styles";

interface TabButtonProps {
  tabType: TabType;
}

export const TabButton: FC<TabButtonProps> = ({ tabType, children }) => {
  const [vaultModalState, setVaultModalState] = useVaultModalState();
  const { tabType: currentTabType } = vaultModalState;

  const handleButtonClick = useCallback(() => {
    setVaultModalState((previousState) => ({
      ...previousState,
      tabType,
    }));
  }, [setVaultModalState, tabType]);

  const isActive = currentTabType === tabType;

  return (
    <Button isActive={isActive} onClick={handleButtonClick}>
      {children}
    </Button>
  );
};
