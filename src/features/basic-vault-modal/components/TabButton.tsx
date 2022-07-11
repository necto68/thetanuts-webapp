import type { FC } from "react";
import { useCallback } from "react";

import type { TabType } from "../types";
import { useBasicModalState } from "../hooks";

import { Button } from "./TabButton.styles";

interface TabButtonProps {
  tabType: TabType;
}

export const TabButton: FC<TabButtonProps> = ({ tabType, children }) => {
  const { tabType: currentTabType, setTabType } = useBasicModalState();

  const handleButtonClick = useCallback(() => {
    setTabType(tabType);
  }, [setTabType, tabType]);

  const isActive = currentTabType === tabType;

  return (
    <Button isActive={isActive} onClick={handleButtonClick}>
      {children}
    </Button>
  );
};
