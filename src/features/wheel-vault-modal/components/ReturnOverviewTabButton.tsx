import type { FC } from "react";
import { useCallback } from "react";

import type { ReturnOverviewTabType } from "../types";
import { Button } from "../../basic-vault-modal/components/TabButton.styles";

interface ReturnOverviewTabButtonProps {
  tabType: ReturnOverviewTabType;
  currentTabType: ReturnOverviewTabType;
  onClick: (tabType: ReturnOverviewTabType) => void;
}

export const ReturnOverviewTabButton: FC<ReturnOverviewTabButtonProps> = ({
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
