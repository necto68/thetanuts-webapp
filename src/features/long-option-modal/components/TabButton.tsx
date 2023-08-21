import type { FC } from "react";
import { useCallback } from "react";

import { Button } from "../../basic-vault-modal/components/TabButton.styles";
import type { VaultType } from "../../basic-vault/types";

interface TabButtonProps {
  currentVaultType: VaultType;
  vaultType: VaultType;
  onClick: (vaultType: VaultType) => void;
}

export const TabButton: FC<TabButtonProps> = ({
  currentVaultType,
  vaultType,
  onClick,
  children,
}) => {
  const isActive = vaultType === currentVaultType;

  const handleButtonClick = useCallback(() => {
    onClick(vaultType);
  }, [onClick, vaultType]);

  return (
    <Button isActive={isActive} isSmall onClick={handleButtonClick}>
      {children}
    </Button>
  );
};
