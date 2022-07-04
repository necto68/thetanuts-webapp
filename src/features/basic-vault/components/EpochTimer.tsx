import type { FC } from "react";

import { useBasicVaultEpochTimerTitle } from "../hooks/useBasicVaultEpochTimerTitle";
import type { BasicVault } from "../types";

import { Container, Title } from "./EpochTimer.styles";

type EpochTimerProps = Pick<BasicVault, "expiry" | "isExpired" | "isSettled">;

export const EpochTimer: FC<EpochTimerProps> = ({
  expiry,
  isExpired,
  isSettled,
}) => {
  const timerTitle = useBasicVaultEpochTimerTitle(expiry, isExpired, isSettled);

  return (
    <Container>
      <Title>
        {isExpired || isSettled ? timerTitle : `Epoch ends in ${timerTitle}`}
      </Title>
    </Container>
  );
};
