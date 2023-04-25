import type { FC } from "react";
import { useCallback } from "react";

import { Button } from "../../basic-vault-modal/components/TabButton.styles";
import type { ClosePositionTabType } from "../types";

interface ClosePositionTabButtonProps {
  tabType: ClosePositionTabType;
  currentTabType: ClosePositionTabType;
  onClick: (tabType: ClosePositionTabType) => void;
}

export const ClosePositionTabButton: FC<ClosePositionTabButtonProps> = ({
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
