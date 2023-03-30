import type { FC } from "react";
import { useCallback } from "react";

import { Button } from "../../basic-vault-modal/components/TabButton.styles";

type TabType = "call" | "put";

interface TabButtonProps {
  tabType: TabType;
  currentTabType: TabType;
  onClick: (tabType: TabType) => void;
}

export const TabButton: FC<TabButtonProps> = ({
  tabType,
  currentTabType,
  onClick,
  children,
}) => {
  const isActive = tabType === currentTabType;

  const handleButtonClick = useCallback(() => {
    onClick(tabType);
  }, [onClick, tabType]);

  return (
    <Button isActive={isActive} isSmall onClick={handleButtonClick}>
      {children}
    </Button>
  );
};
