import type { FC } from "react";
import { useCallback } from "react";

import { useIndexVault } from "../hooks";
import { useIndexVaultModalState } from "../../index-vault-modal/hooks";
import { VaultType } from "../../vault/constants";
import {
  numberFormatter,
  totalValueLockedFormatter,
} from "../../shared/helpers";
import { SkeletonBox, IconContainer } from "../../shared/components";
import { getLogoBySymbol } from "../../logo/helpers";

import {
  APYContainer,
  AssetTitle,
  AssetTitleContainer,
  Container,
  Content,
  DataTitle,
  DataValue,
  APYDataValue,
  Header,
  SwapContainer,
  SwapTitle,
  TVLContainer,
} from "./IndexVault.styles";

interface IndexVaultProps {
  indexVaultId: string;
}

export const IndexVault: FC<IndexVaultProps> = ({ indexVaultId }) => {
  const { isLoading, data } = useIndexVault(indexVaultId);

  const [, setModalState] = useIndexVaultModalState();

  const handleVaultClick = useCallback(() => {
    setModalState({ isShow: true, indexVaultId });
  }, [setModalState, indexVaultId]);

  const {
    type,
    assetSymbol = "",
    totalPercentageYields,
    totalValueLocked = 0,
  } = data ?? {};

  const { annualPercentageYield = 0 } = totalPercentageYields ?? {};

  const assetTitle = `${assetSymbol}-${type === VaultType.CALL ? "C" : "P"}`;
  const formattedTotalAPY = numberFormatter.format(annualPercentageYield);
  const formattedTVL = totalValueLockedFormatter(totalValueLocked);

  const assetLogo = getLogoBySymbol(assetSymbol);

  return (
    <Container onClick={handleVaultClick}>
      <Header>
        {isLoading ? (
          <SkeletonBox height={32} width={120} />
        ) : (
          <AssetTitleContainer>
            <IconContainer height={25} width={25}>
              {assetLogo}
            </IconContainer>
            <AssetTitle>{assetTitle}</AssetTitle>
          </AssetTitleContainer>
        )}
      </Header>
      <Content>
        <APYContainer>
          <DataTitle>APY</DataTitle>
          {isLoading ? (
            <SkeletonBox height={32} width={60} />
          ) : (
            <APYDataValue>{`${formattedTotalAPY} %`}</APYDataValue>
          )}
        </APYContainer>
        <TVLContainer>
          <DataTitle>TVL</DataTitle>
          {isLoading ? (
            <SkeletonBox height={32} width={60} />
          ) : (
            <DataValue>{formattedTVL}</DataValue>
          )}
        </TVLContainer>
      </Content>
      <SwapContainer>
        <SwapTitle>Swap</SwapTitle>
      </SwapContainer>
    </Container>
  );
};
