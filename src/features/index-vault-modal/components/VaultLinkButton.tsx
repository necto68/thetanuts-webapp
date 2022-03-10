import type { FC } from "react";

import { IconContainer, Link } from "../../shared/components";
import { NewTab } from "../../shared/icons";
import { useSwapRouterConfig } from "../hooks";
import { getExplorerUrl } from "../../wallet/helpers";
import { PathType } from "../../wallet/types";

import { IconButton } from "./VaultLinkButton.styles";

interface VaultLinkButtonProps {
  vaultAddress: string;
}

export const VaultLinkButton: FC<VaultLinkButtonProps> = ({ vaultAddress }) => {
  const { indexVaultQuery } = useSwapRouterConfig();
  const { data } = indexVaultQuery;
  const { chainId = 1 } = data ?? {};
  const link = getExplorerUrl(PathType.address, chainId, vaultAddress);

  return (
    <Link target="_blank" to={link}>
      <IconButton primaryColor="transparent" secondaryColor="transparent">
        <IconContainer height={17} width={17}>
          <NewTab />
        </IconContainer>
      </IconButton>
    </Link>
  );
};
