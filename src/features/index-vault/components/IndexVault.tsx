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
  Header,
  SwapContainer,
  SwapTitle,
  TVLContainer,
  TypeTitle,
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
      {isLoading ? (
        <Header>
          <SkeletonBox height={32} width={44} />
          <SkeletonBox height={27} width={75} />
        </Header>
      ) : (
        <Header>
          <AssetTitleContainer>
            <IconContainer height={25} width={25}>
              {assetLogo}
            </IconContainer>
            <AssetTitle>{assetTitle}</AssetTitle>
          </AssetTitleContainer>
          <TypeTitle>{type === VaultType.CALL ? "Call" : "Put"}</TypeTitle>
        </Header>
      )}
      <Content>
        <APYContainer>
          <DataTitle>APY</DataTitle>
          {isLoading ? (
            <SkeletonBox height={32} width={60} />
          ) : (
            <DataValue>{`${formattedTotalAPY} %`}</DataValue>
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
