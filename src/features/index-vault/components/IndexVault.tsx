import type { FC } from "react";
import { useCallback } from "react";

import { useIndexVault } from "../hooks";
import { useIndexVaultModalState } from "../../index-vault-modal/hooks";
import { VaultType } from "../../vault/constants";
import {
  numberFormatter,
  totalValueLockedFormatter,
} from "../../shared/helpers";
import { SkeletonBox } from "../../shared/components";

import {
  APYContainer,
  AssetTitle,
  Container,
  Content,
  DataTitle,
  DataValue,
  Header,
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

  return (
    <Container onClick={handleVaultClick}>
      {isLoading ? (
        <Header>
          <SkeletonBox height={32} width={44} />
          <SkeletonBox height={27} width={75} />
        </Header>
      ) : (
        <Header>
          <TypeTitle>{type === VaultType.CALL ? "Call" : "Put"}</TypeTitle>
          <AssetTitle>{assetTitle}</AssetTitle>
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
      <SwapTitle>Swap</SwapTitle>
    </Container>
  );
};
