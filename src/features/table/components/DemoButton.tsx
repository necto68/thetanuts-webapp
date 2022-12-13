import { useTheme } from "styled-components";

import type { AppTheme } from "../../app/constants/appTheme";

import { DemoVaultModalButton } from "./VaultModalButton.styles";

export const DemoButton = () => {
  const theme = useTheme() as AppTheme;
  const { borderColor } = theme;

  return (
    <DemoVaultModalButton disabled primaryColor={borderColor}>
      Coming Soon
    </DemoVaultModalButton>
  );
};
