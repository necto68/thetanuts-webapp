import type { FC } from "react";

import { numberFormatter } from "../../shared/helpers";
import type { BasicVault } from "../types";
import { Tooltip } from "../../shared/components";

import { Container, SubTitle, Title } from "./BasicVaultCapacityPercent.styles";

type BasicVaultCapacityProps = Pick<
  BasicVault,
  "balance" | "collatCap" | "collateralSymbol"
>;

export const BasicVaultCapacityPercent: FC<BasicVaultCapacityProps> = ({
  collateralSymbol,
  balance,
  collatCap,
}) => {
  const formattedDepositsValue = collatCap.gt(0)
    ? balance.div(collatCap).mul(100).round(2).toNumber()
    : 0;

  const formattedBalance = numberFormatter.format(balance.toNumber());
  const formattedTotal = numberFormatter.format(collatCap.toNumber());

  return (
    <Container>
      <Tooltip
        content={
          <SubTitle>
            Capacity: {formattedDepositsValue}% <br />({formattedBalance} /{" "}
            {formattedTotal} {collateralSymbol})
          </SubTitle>
        }
        id={`${formattedTotal} ${collateralSymbol} ${formattedDepositsValue}`}
        place="top"
        root={<Title>{formattedDepositsValue}%</Title>}
      />
    </Container>
  );
};
