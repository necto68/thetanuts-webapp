import { useSwapRouterConfig, useTokenQuery } from "../hooks";
import {
  addressFormatter,
  currencyFormatterWithoutDecimals,
} from "../../shared/helpers";
import { getExplorerUrl } from "../../wallet/helpers";
import { PathType } from "../../wallet/types";

import {Tooltip} from '../../shared/components/Tooltip' 

import {
  Container,
  InfoContainer,
  InfoLink,
  InfoValue,
  TooltipContainer
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
        <TooltipContainer>
            <InfoValue isUnderline>Index Value</InfoValue>
            <Tooltip 
            color="black"
            type="popup"
            toolTipId="popupIndexValueTooltip" 
            data='Refers to price of Theta-Assets if all consituent vaults settle at this time'  />
          </TooltipContainer>
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
        <TooltipContainer>
          <InfoValue isUnderline>Index Token Address</InfoValue>
          <Tooltip 
          color="black"
          type="popup"
          toolTipId="popupIndexTokenAccessTooltip" 
          data=' A token that represents a share of ownership in the vault'  />
        </TooltipContainer>
        <InfoLink href={indexTokenExplorerUrl} target="_blank">
          {indexTokenAddress}
        </InfoLink>
      </InfoContainer>
    </Container>
  );
};
