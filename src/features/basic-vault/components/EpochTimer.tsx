import type { FC } from "react";

import { getBasicVaultStatusTitle } from "../helpers";
import { useBasicVaultEpochTimerTitle } from "../hooks/useBasicVaultEpochTimerTitle";
import type { BasicVault } from "../types";

import { Container, Title } from "./EpochTimer.styles";

type EpochTimerProps = Pick<
  BasicVault,
  "expiry" | "isAllowInteractions" | "isExpired" | "isSettled"
>;

export const EpochTimer: FC<EpochTimerProps> = ({
  expiry,
  isSettled,
  isExpired,
  isAllowInteractions,
}) => {
  const timerTitle = useBasicVaultEpochTimerTitle(
    expiry,
    isSettled,
    isExpired,
    isAllowInteractions
  );

  const basicVaultStatusTitle = getBasicVaultStatusTitle(
    isSettled,
    isExpired,
    isAllowInteractions
  );

  return (
    <Container>
      <Title>{basicVaultStatusTitle ?? `Epoch ends in ${timerTitle}`}</Title>
    </Container>
  );
};
