import type { FC } from "react";
import { useCallback } from "react";
import { generatePath } from "react-router-dom";
import { useTheme } from "styled-components";

import { Link } from "../../shared/components";
import { useVaultModalState } from "../../modal/hooks";
import type { VaultModalState } from "../../shared/hooks";
import { getModalPathname } from "../../root/helpers";
import type { AppTheme } from "../../app/constants/appTheme";

import { BaseVaultModalButton } from "./VaultModalButton.styles";

export interface VaultModalButtonProps
  extends Pick<
    VaultModalState,
    "chainId" | "contentType" | "vaultId" | "vaultType" | "withdrawId"
  > {
  borderColor?: string;
}

export const VaultModalButton: FC<VaultModalButtonProps> = ({
  chainId,
  contentType,
  vaultId,
  vaultType,
  withdrawId,
  borderColor,
  children,
}) => {
  const [vaultModalState, setVaultModalState] = useVaultModalState();

  const theme = useTheme() as AppTheme;
  const defaultBorderColor = theme.borderColor;

  const { isRouterModal } = vaultModalState;

  const modalPathname = getModalPathname(vaultType);
  const pathname = generatePath(modalPathname, {
    vaultId,
  });
  const vaultModalRoute = isRouterModal ? { pathname } : {};

  const handleButtonClick = useCallback(() => {
    setVaultModalState((previousState) => ({
      ...previousState,
      isShow: true,
      vaultType,
      vaultId,
      contentType,
      withdrawId,
      chainId,
    }));
  }, [
    vaultType,
    vaultId,
    contentType,
    withdrawId,
    chainId,
    setVaultModalState,
  ]);

  return (
    <Link to={vaultModalRoute}>
      <BaseVaultModalButton
        onClick={handleButtonClick}
        primaryColor={borderColor ?? defaultBorderColor}
      >
        {children}
      </BaseVaultModalButton>
    </Link>
  );
};
