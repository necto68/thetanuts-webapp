import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { VaultType } from "../../basic-vault/types";
import { getDegenVaultTitle } from "../../degen-vault/helpers";
import { highYieldFormatter, numberFormatter } from "../../shared/helpers";

import {
  Container,
  Title,
  APYContainer,
  APYContent,
  APYTitle,
  APYValue,
} from "./Header.styles";

export const Header = () => {
  const { basicVaultQuery } = useBasicModalConfig();

  const { data, isLoading } = basicVaultQuery;

  const {
    type = VaultType.CALL,
    percentageYields = {
      annualPercentageYield: 0,
      weeklyPercentageYield: 0,
    },
  } = data ?? {};

  const { annualPercentageYield, weeklyPercentageYield } = percentageYields;

  const title = getDegenVaultTitle(type);

  const formattedWeeklyYield = numberFormatter.format(weeklyPercentageYield);
  const formattedTotalAPY = highYieldFormatter(annualPercentageYield);

  return (
    <Container>
      <Title>{isLoading ? "-" : title}</Title>
      <APYContainer>
        <APYContent>
          <APYTitle>Current Week’s Yield</APYTitle>
          <APYValue>{`${formattedWeeklyYield}%`}</APYValue>
        </APYContent>
        <APYContent>
          <APYTitle>Current Projected APY</APYTitle>
          <APYValue>{`${formattedTotalAPY}%`}</APYValue>
        </APYContent>
      </APYContainer>
    </Container>
  );
};
