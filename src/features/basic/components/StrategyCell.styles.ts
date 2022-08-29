import styled from "styled-components";

import type { BasicVault } from "../../basic-vault/types";
import { VaultType } from "../../basic-vault/types";

import { Title } from "./BasicVaultAssetCell.styles";

type StrategyTitleProps = Pick<BasicVault, "type">;

export const StrategyTitle = styled(Title)<StrategyTitleProps>`
  color: ${({ type }) => (type === VaultType.CALL ? "#02d1ff" : "#fe9902")};
  text-transform: uppercase;
`;

export const PeriodTitle = styled(Title)`
  text-transform: uppercase;
`;
