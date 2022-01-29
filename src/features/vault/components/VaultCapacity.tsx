import type { FC } from "react";

import { SkeletonBox } from "../../shared/components";
import type { Vault } from "../types";
import { numberFormatter } from "../../shared/helpers";
import { getCurrentDepositRate } from "../helpers";

import {
  DepositContainer,
  DepositTitleContainer,
  DepositTitle,
  DepositValue,
  ProgressBar,
  Progress,
} from "./VaultCapacity.styles";

interface VaultCapacityProps
  extends Pick<Vault, "currentDeposit" | "depositSymbol" | "maxDeposit"> {
  primaryColor: string;
}

export const VaultCapacity: FC<VaultCapacityProps> = ({
  currentDeposit,
  maxDeposit,
  depositSymbol = "",
  primaryColor,
}) => {
  const currentDepositRate =
    getCurrentDepositRate(currentDeposit, maxDeposit) ?? 0;

  return (
    <DepositContainer>
      <DepositTitleContainer>
        <DepositTitle>Current Deposits</DepositTitle>
        {typeof currentDeposit !== "undefined" ? (
          <DepositValue>
            <b>{`${currentDepositRate}% `}</b>
            Deposited
          </DepositValue>
        ) : (
          <SkeletonBox height={23} width={120} />
        )}
      </DepositTitleContainer>
      <ProgressBar>
        <Progress
          color={primaryColor}
          currentDepositRate={currentDepositRate}
        />
      </ProgressBar>
      <DepositTitleContainer>
        <DepositTitle>Max Capacity</DepositTitle>
        {typeof maxDeposit !== "undefined" ? (
          <DepositValue>
            {`${numberFormatter.format(
              maxDeposit.toNumber()
            )} ${depositSymbol}`}
          </DepositValue>
        ) : (
          <SkeletonBox height={23} width={120} />
        )}
      </DepositTitleContainer>
    </DepositContainer>
  );
};
