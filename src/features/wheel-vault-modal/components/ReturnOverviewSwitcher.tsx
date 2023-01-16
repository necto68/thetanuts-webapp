import type { FC } from "react";

import { Container } from "../../basic-vault-modal/components/Switcher.styles";
import { ReturnOverviewTabType } from "../types";
import { strikePriceFormatter } from "../../shared/helpers";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { VaultType } from "../../basic-vault/types";

import { ReturnOverviewTabButton } from "./ReturnOverviewTabButton";

interface ReturnOverviewSwitcherProps {
  currentTabType: ReturnOverviewTabType;
  onTabButtonClick: (tabType: ReturnOverviewTabType) => void;
}

export const ReturnOverviewSwitcher: FC<ReturnOverviewSwitcherProps> = ({
  currentTabType,
  onTabButtonClick,
}) => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { data } = basicVaultQuery;
  const { type = VaultType.CALL, strikePrices = [0] } = data ?? {};

  const isCall = type === VaultType.CALL;

  const successEpochPrefix = isCall ? "Below" : "Above";
  const failedEpochPrefix = isCall ? "At or Above" : "At or Below";

  const formattedStrikePrice = strikePriceFormatter(strikePrices[0]);

  return (
    <Container>
      <ReturnOverviewTabButton
        currentTabType={currentTabType}
        onClick={onTabButtonClick}
        tabType={ReturnOverviewTabType.successEpoch}
      >
        {`${successEpochPrefix} ${formattedStrikePrice}`}
      </ReturnOverviewTabButton>
      <ReturnOverviewTabButton
        currentTabType={currentTabType}
        onClick={onTabButtonClick}
        tabType={ReturnOverviewTabType.failureEpoch}
      >
        {`${failedEpochPrefix} ${formattedStrikePrice}`}
      </ReturnOverviewTabButton>
    </Container>
  );
};
