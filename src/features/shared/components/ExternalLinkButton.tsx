import type { FC } from "react";

import { NewTab } from "../icons";
import { getExplorerUrl } from "../../wallet/helpers";
import type { PathType } from "../../wallet/types";
import type { ChainId } from "../../wallet/constants";

import { IconContainer } from "./IconContainer";
import { Link } from "./Link";
import { IconButton } from "./ExternalLinkButton.styles";

interface ExternalLinkButtonProps {
  id: string;
  chainId: ChainId;
  pathType: PathType;
}

export const ExternalLinkButton: FC<ExternalLinkButtonProps> = ({
  id,
  chainId,
  pathType,
}) => {
  const link = getExplorerUrl(pathType, chainId, id);

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
