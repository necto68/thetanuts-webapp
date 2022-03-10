import { useSwapRouterConfig, useTokenQuery } from "../hooks";
import {
  addressFormatter,
  currencyFormatterWithoutDecimals,
} from "../../shared/helpers";
import { getExplorerUrl } from "../../wallet/helpers";
import { PathType } from "../../wallet/types";

import {
  Container,
  InfoContainer,
  InfoLink,
  InfoValue,
} from "./IndexInfo.styles";

// eslint-disable-next-line complexity,sonarjs/cognitive-complexity
export const IndexInfo = () => {
  const {
    defaultSourceAddress,
    defaultTargetAddress,
    routerAddress,
    provider,
    chainId,
    indexVaultQuery,
  } = useSwapRouterConfig();

  const { isLoading, data } = indexVaultQuery;

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

  const indexValue =
    !isLoading && data ? (data.indexPrice / data.assetPrice).toFixed(5) : "";

  const indexTokenAddress =
    !isTargetDataLoading && targetData && chainId
      ? `${targetData.symbol} (${addressFormatter(targetData.tokenAddress)})`
      : ".....";

  const underlyingTokenExplorerUrl =
    chainId && sourceData
      ? getExplorerUrl(PathType.token, chainId, sourceData.tokenAddress)
      : "";

  const indexTokenExplorerUrl =
    chainId && targetData
      ? getExplorerUrl(PathType.token, chainId, targetData.tokenAddress)
      : "";

  return (
    <Container>
      <InfoContainer>
        <InfoValue>Index Value</InfoValue>
        <InfoValue>{`${indexValue} ${underlyingAssetSymbol}`}</InfoValue>
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
