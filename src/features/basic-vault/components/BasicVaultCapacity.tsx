import type { FC } from "react";

import { numberFormatter } from "../../shared/helpers";
import type { BasicVault, ProgressBarColor } from "../types";

import {
  Container,
  ProgressBar,
  ProgressBarContainer,
  Title,
} from "./BasicVaultCapacity.styles";

interface BasicVaultCapacityProps
  extends Pick<BasicVault, "balance" | "collatCap" | "collateralSymbol"> {
  progressBarColor: ProgressBarColor;
}

export const BasicVaultCapacity: FC<BasicVaultCapacityProps> = ({
  collateralSymbol,
  balance,
  collatCap,
  progressBarColor,
}) => {
  const formattedDepositsValue = collatCap.gt(0)
    ? balance.div(collatCap).mul(100).round(2).toNumber()
    : 0;

  const formattedTotal = numberFormatter.format(collatCap.toNumber());

  return (
    <Container>
      <ProgressBarContainer>
        <ProgressBar color={progressBarColor} value={formattedDepositsValue} />
      </ProgressBarContainer>
      <Title>{`Total: ${formattedTotal} ${collateralSymbol} (${formattedDepositsValue}%)`}</Title>
    </Container>
  );
};
