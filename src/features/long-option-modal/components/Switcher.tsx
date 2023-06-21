import type { FC } from "react";

import { Container } from "../../basic-vault-modal/components/Switcher.styles";
import { VaultType } from "../../basic-vault/types";

import { TabButton } from "./TabButton";

interface SwitcherProps {
  currentVaultType: VaultType;
  onTabButtonClick: (vaultType: VaultType) => void;
}

export const Switcher: FC<SwitcherProps> = ({
  currentVaultType,
  onTabButtonClick,
}) => (
  <Container>
    <TabButton
      currentVaultType={currentVaultType}
      onClick={onTabButtonClick}
      vaultType={VaultType.CALL}
    >
      Call
    </TabButton>
    <TabButton
      currentVaultType={currentVaultType}
      onClick={onTabButtonClick}
      vaultType={VaultType.PUT}
    >
      Put
    </TabButton>
  </Container>
);
