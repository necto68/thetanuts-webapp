import { useEffect, useState } from "react";

import {
  useIndexVaultModalState,
  useSwapRouterConfig,
  useTokenQuery,
} from "../hooks";
import { useIndexVault } from "../../index-vault/hooks";
import {
  addressFormatter,
  currencyFormatterWithoutDecimals,
} from "../../shared/helpers";
import type { ChainId } from "../../wallet/constants";
import { chainsMap } from "../../wallet/constants";

import {
  Container,
  InfoContainer,
  InfoValue,
  InfoLink,
} from "./IndexInfo.styles";

const getTokenExplorerUrl = (currentChainId: ChainId, tokenAddress: string) => {
  const { explorerUrl } = chainsMap[currentChainId];

  return new URL(`/token/${tokenAddress}`, explorerUrl).toString();
};

// eslint-disable-next-line complexity
export const IndexInfo = () => {
  const [{ indexVaultId }] = useIndexVaultModalState();
  const { isLoading, data } = useIndexVault(indexVaultId);
  const [currentChainId, setCurrentChainId] = useState<ChainId | null>(null);

  const {
    defaultSourceAddress,
    defaultTargetAddress,
    routerAddress,
    provider,
  } = useSwapRouterConfig();

  useEffect(() => {
    void (async () => {
      const { chainId } = await provider.getNetwork();
      setCurrentChainId(chainId);
    })();
  }, [provider]);

  const { data: sourceData, isLoading: isSourceDataLoading } = useTokenQuery(
    defaultSourceAddress,
    routerAddress,
    provider
  );

  const { data: targetData, isLoading: isTargetDataLoading } = useTokenQuery(
    defaultTargetAddress,
    routerAddress,
    provider
  );

  const formattedTVL =
    !isLoading && data
      ? currencyFormatterWithoutDecimals.format(data.totalValueLocked)
      : ".....";

  const underlyingAssetSymbol =
    !isSourceDataLoading && sourceData ? sourceData.symbol : ".....";

  const indexTokenAddress =
    !isTargetDataLoading && targetData && currentChainId
      ? `${targetData.symbol} (${addressFormatter(targetData.tokenAddress)})`
      : ".....";

  const underlyingTokenExplorerUrl =
    currentChainId && sourceData
      ? getTokenExplorerUrl(currentChainId, sourceData.tokenAddress)
      : "";

  const indexTokenExplorerUrl =
    currentChainId && targetData
      ? getTokenExplorerUrl(currentChainId, targetData.tokenAddress)
      : "";

  return (
    <Container>
      <InfoContainer>
        <InfoValue>Index Value</InfoValue>
        <InfoValue>1.12345 ETH</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoValue>TVL</InfoValue>
        <InfoValue>{formattedTVL}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoValue>Underlying Asset</InfoValue>
        <InfoLink href={underlyingTokenExplorerUrl} target="_blank">
          {underlyingAssetSymbol}
        </InfoLink>
      </InfoContainer>
      <InfoContainer>
        <InfoValue>Index Token Address</InfoValue>
        <InfoLink href={indexTokenExplorerUrl} target="_blank">
          {indexTokenAddress}
        </InfoLink>
      </InfoContainer>
    </Container>
  );
};
