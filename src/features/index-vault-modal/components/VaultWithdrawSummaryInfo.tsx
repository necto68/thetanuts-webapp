import { useSwapRouterConfig, useSwapRouterState } from "../hooks";
import { chainsMap } from "../../wallet/constants";
import { addressFormatter } from "../../shared/helpers";
import { useWithdrawDataQuery } from "../hooks/useWithdrawDataQuery";

import {
  Container,
  InfoContainer,
  InfoTitleContainer,
  InfoTitleLight,
  InfoValueLight,
} from "./VaultInfo.styles";
import { TextWarning } from "./TextWarning";

export const VaultWithdrawSummaryInfo = () => {
  const { indexVaultQuery } = useSwapRouterConfig();
  const { data: withdrawData } = useWithdrawDataQuery();
  const { data } = indexVaultQuery;

  const { sourceValue, sourceData } = useSwapRouterState();

  const { symbol } = sourceData ?? {};

  const { chainId = 1 } = data ?? {};

  const signerAddress = addressFormatter(withdrawData?.signerAddress ?? "");

  return (
    <Container>
      <TextWarning size={16} text="Warning: You cannot undo this step" />
      <InfoContainer>
        <InfoTitleContainer>
          <InfoTitleLight>Wallet Address</InfoTitleLight>
        </InfoTitleContainer>
        <InfoValueLight isAlignRight>{signerAddress}</InfoValueLight>
      </InfoContainer>
      <InfoContainer>
        <InfoTitleContainer>
          <InfoTitleLight>Full Withdraw Schedule</InfoTitleLight>
        </InfoTitleContainer>
        <InfoValueLight isAlignRight>
          {withdrawData?.formattedLastVaultExpiry}
        </InfoValueLight>
      </InfoContainer>
      <InfoContainer>
        <InfoTitleContainer>
          <InfoTitleLight>Main Network</InfoTitleLight>
        </InfoTitleContainer>
        <InfoValueLight isAlignRight>{chainsMap[chainId].title}</InfoValueLight>
      </InfoContainer>
      <InfoContainer>
        <InfoTitleContainer>
          <InfoTitleLight>Withdraw Amount</InfoTitleLight>
        </InfoTitleContainer>
        <InfoValueLight isAlignRight>
          {sourceValue} {symbol}
        </InfoValueLight>
      </InfoContainer>
    </Container>
  );
};
