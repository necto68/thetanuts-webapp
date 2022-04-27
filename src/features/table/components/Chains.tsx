import type { FC } from "react";

import type { ChainId } from "../../wallet/constants";
import { IconContainer, Tooltip } from "../../shared/components";
import { useIsMobile } from "../../shared/hooks";
import { chainsMap } from "../../wallet/constants";
import { getLogoBySymbol } from "../../logo/helpers";

import {
  Container,
  ChainLogoContainer,
  HiddenChainsContainer,
  HiddenChainsTitle,
} from "./Chains.styles";

interface ChainsProps {
  chainIds: ChainId[];
  highlightedChainId?: ChainId;
}

export const Chains: FC<ChainsProps> = ({ chainIds, highlightedChainId }) => {
  const isMobile = useIsMobile();
  const isShowShortenedChains = isMobile && chainIds.length > 3;

  const visibleChains = isShowShortenedChains ? chainIds.slice(0, 3) : chainIds;
  const hiddenChains = isShowShortenedChains ? chainIds.slice(3) : [];

  const tooltipId = hiddenChains.join("");
  const tooltipContent = hiddenChains
    .map((chainId) => chainsMap[chainId].title)
    .join(", ");

  return (
    <Container>
      {visibleChains.map((chainId) => (
        <ChainLogoContainer
          isHighlighted={chainId === highlightedChainId}
          key={chainId}
        >
          <IconContainer height={18} width={18}>
            {getLogoBySymbol(chainsMap[chainId].symbol)}
          </IconContainer>
        </ChainLogoContainer>
      ))}
      {isShowShortenedChains ? (
        <Tooltip
          content={tooltipContent}
          id={tooltipId}
          root={
            <HiddenChainsContainer>
              <HiddenChainsTitle>{`+${hiddenChains.length}`}</HiddenChainsTitle>
            </HiddenChainsContainer>
          }
        />
      ) : null}
    </Container>
  );
};
