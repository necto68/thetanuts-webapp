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
  InfoLink,
  InfoValue,
  InfoValueContainer,
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
        <InfoValueContainer>
          <InfoValue>Index Value</InfoValue>
          <Tooltip
            content="Refers to the price of the Theta-Index if all constituent vaults are settled at this time."
            id="indexValue"
            root={<InfoIcon />}
          />
        </InfoValueContainer>
        <InfoValue
          isAlignRight
        >{`${indexValue} ${underlyingAssetSymbol}`}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoValue>TVL</InfoValue>
        <InfoValue isAlignRight>{formattedTVL}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoValue>Underlying Asset</InfoValue>
        <InfoLink
          href={underlyingTokenExplorerUrl}
          isAlignRight
          target="_blank"
        >
          {underlyingAssetSymbol}
        </InfoLink>
      </InfoContainer>
      <InfoContainer>
        <InfoValueContainer>
          <InfoValue>Index Token Address</InfoValue>
          <Tooltip
            content="This represents a pro-rata share of ownership in the constituent vaults that make up the Index."
            id="indexTokenAddress"
            root={<InfoIcon />}
          />
        </InfoValueContainer>
        <InfoLink href={indexTokenExplorerUrl} isAlignRight target="_blank">
          {indexTokenAddress}
        </InfoLink>
      </InfoContainer>
    </Container>
  );
};
