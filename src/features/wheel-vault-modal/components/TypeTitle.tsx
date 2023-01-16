import type { FC } from "react";

import type { VaultType } from "../../basic-vault/types";
import { getVaultTypeTitle } from "../../index-vault/helpers";

import { Title } from "./TypeTitle.styles";

interface TypeTitleProps {
  type: VaultType;
  isActive: boolean;
}

export const TypeTitle: FC<TypeTitleProps> = ({ type, isActive }) => {
  const vaultTypeTitle = getVaultTypeTitle(type);

  return <Title isActive={isActive}>{vaultTypeTitle}</Title>;
};
