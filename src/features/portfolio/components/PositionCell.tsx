import type { FC } from "react";

import type { BasicVaultRow } from "../types";
import { numberFormatter } from "../../shared/helpers";
import { APYCellContainer, CellValue } from "../../table/components";
import { Tooltip } from "../../shared/components";
import { TooltipText } from "../../table/components/Table.styles";

import { Container } from "./BasicVaultPositionCell.styles";

type PositionCellProps = Pick<
  BasicVaultRow,
  "currentPosition" | "depositPending" | "id" | "symbol" | "withdrawalPending"
>;

export const PositionCell: FC<PositionCellProps> = ({
  id,
  symbol,
  currentPosition,
  depositPending,
  withdrawalPending,
}) => {
  const totalPosition = currentPosition
    ? currentPosition.add(depositPending ?? 0)
    : null;

  const [
    totalPositionTitle,
    depositPendingTitle,
    currentPositionTitle,
    withdrawalPendingTitle,
  ] = [totalPosition, depositPending, currentPosition, withdrawalPending].map(
    (value) =>
      value?.gt(0)
        ? `${numberFormatter.format(value.toNumber())} ${symbol}`
        : ""
  );

  return (
    <APYCellContainer>
      <Tooltip
        content={
          <Container>
            {depositPending?.gt(0) ? (
              <TooltipText>{`Deposit Pending: ${depositPendingTitle}`}</TooltipText>
            ) : null}
            {currentPosition?.gt(0) ? (
              <TooltipText>{`Current Position: ${currentPositionTitle}`}</TooltipText>
            ) : null}
            {withdrawalPending?.gt(0) ? (
              <TooltipText>{`Withdrawal Pending: ${withdrawalPendingTitle}`}</TooltipText>
            ) : null}
          </Container>
        }
        id={`${id}-position`}
        place="top"
        root={<CellValue>{totalPositionTitle}</CellValue>}
      />
    </APYCellContainer>
  );
};
