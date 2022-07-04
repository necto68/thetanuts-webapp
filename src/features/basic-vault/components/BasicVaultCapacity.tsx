import type { FC } from "react";

import { numberFormatter } from "../../shared/helpers";
import type { BasicVault } from "../types";

import {
  Container,
  ProgressBar,
  ProgressBarContainer,
  Title,
} from "./BasicVaultCapacity.styles";

type BasicVaultCapacityProps = Pick<
  BasicVault,
  "balance" | "collatCap" | "collateralSymbol" | "type"
>;

export const BasicVaultCapacity: FC<BasicVaultCapacityProps> = ({
  collateralSymbol,
  balance,
  collatCap,
  type,
}) => {
  const formattedDepositsValue = collatCap.gt(0)
    ? balance.div(collatCap).mul(100).round(2).toNumber()
    : 0;

  const formattedTotal = numberFormatter.format(collatCap.toNumber());

  return (
    <Container>
      <ProgressBarContainer>
        <ProgressBar type={type} value={formattedDepositsValue} />
      </ProgressBarContainer>
      <Title>{`Total: ${formattedTotal} ${collateralSymbol} (${formattedDepositsValue}%)`}</Title>
    </Container>
  );
};
