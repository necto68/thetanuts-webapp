import type { FC } from "react";
import { useCallback } from "react";

import { useIndexVault } from "../hooks";
import { useIndexVaultModalState } from "../../index-vault-modal/hooks";
import {
  numberFormatter,
  totalValueLockedFormatter,
} from "../../shared/helpers";
import { SkeletonBox, IconContainer } from "../../shared/components";
import { getLogoBySymbol } from "../../logo/helpers";

import {
  APYContainer,
  AssetTitle,
  VaultTypeTitle,
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
    assetSymbol = "",
    totalPercentageYields,
    totalValueLocked = 0,
  } = data ?? {};

  const { annualPercentageYield = 0 } = totalPercentageYields ?? {};

  const formattedTotalAPY = numberFormatter.format(annualPercentageYield);
  const formattedTVL = totalValueLockedFormatter(totalValueLocked);

  const assetLogo = getLogoBySymbol(assetSymbol);

  return (
    <Container onClick={handleVaultClick}>
      {isLoading ? (
        <Header>
          <SkeletonBox height={27} width={90} />
          <SkeletonBox height={27} width={90} />
        </Header>
      ) : (
        <Header>
          <AssetTitleContainer>
            <IconContainer height={22} width={22}>
              {assetLogo}
            </IconContainer>
            <AssetTitle>{assetSymbol}</AssetTitle>
          </AssetTitleContainer>
          <VaultTypeTitle>Stronghold</VaultTypeTitle>
        </Header>
      )}
      <Content>
        <APYContainer>
          <DataTitle>Index APY</DataTitle>
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
