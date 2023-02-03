import type { FC } from "react";

import { VaultType } from "../../basic-vault/types";
import { getVaultTypeShortTitle } from "../../index-vault/helpers";

import { Container, StrategyTitle } from "./WheelStrategyTitle.styles";

interface WheelStrategyTitleProps {
  type: VaultType;
}

export const WheelStrategyTitle: FC<WheelStrategyTitleProps> = ({ type }) => (
  <Container>
    <StrategyTitle isActive={type === VaultType.CALL}>
      {getVaultTypeShortTitle(VaultType.CALL)}
    </StrategyTitle>
    <StrategyTitle>/</StrategyTitle>
    <StrategyTitle isActive={type === VaultType.PUT}>
      {getVaultTypeShortTitle(VaultType.PUT)}
    </StrategyTitle>
  </Container>
);
