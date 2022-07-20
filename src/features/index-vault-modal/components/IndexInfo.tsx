import { useSwapRouterConfig, useTokenQuery } from "../hooks";
import {
  addressFormatter,
  currencyFormatterWithoutDecimals,
} from "../../shared/helpers";
import { getExplorerUrl } from "../../wallet/helpers";
import { PathType } from "../../wallet/types";
import { InfoIcon, Tooltip } from "../../shared/components";

import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
  InfoLink,
  InfoTitleContainer,
} from "./IndexInfo.styles";

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

  const indexTokenAddress =
    !isTargetDataLoading && targetData
      ? `${targetData.symbol} (${addressFormatter(targetData.tokenAddress)})`
      : ".....";

  const underlyingTokenExplorerUrl = sourceData
    ? getExplorerUrl(PathType.token, chainId, sourceData.tokenAddress)
    : "";

  const indexTokenExplorerUrl = targetData
    ? getExplorerUrl(PathType.token, chainId, targetData.tokenAddress)
    : "";

  return (
    <Container>
      <InfoContainer>
        <InfoTitle>TVL</InfoTitle>
        <InfoValue isAlignRight>{formattedTVL}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Underlying Asset</InfoTitle>
        <InfoLink
          href={underlyingTokenExplorerUrl}
          isAlignRight
          target="_blank"
        >
          {underlyingAssetSymbol}
        </InfoLink>
      </InfoContainer>
      <InfoContainer>
        <InfoTitleContainer>
          <InfoTitle>Stronghold Token Address</InfoTitle>
          <Tooltip
            content="This represents a pro-rata share of ownership in the constituent vaults that make up the Stronghold."
            id="indexTokenAddress"
            root={<InfoIcon />}
          />
        </InfoTitleContainer>
        <InfoLink href={indexTokenExplorerUrl} isAlignRight target="_blank">
          {indexTokenAddress}
        </InfoLink>
      </InfoContainer>
    </Container>
  );
};
