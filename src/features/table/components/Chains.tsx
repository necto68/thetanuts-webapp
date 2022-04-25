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
  chains: {
    chainId: ChainId;
    isHighlighted?: boolean;
  }[];
}

export const Chains: FC<ChainsProps> = ({ chains }) => {
  const isMobile = useIsMobile();
  const isShowShortenedChains = isMobile && chains.length > 3;

  const visibleChains = isShowShortenedChains ? chains.slice(0, 3) : chains;
  const hiddenChains = isShowShortenedChains ? chains.slice(3) : [];

  const tooltipId = hiddenChains.join("");
  const tooltipContent = hiddenChains
    .map(({ chainId }) => chainsMap[chainId].title)
    .join(", ");

  return (
    <Container>
      {visibleChains.map(({ chainId, isHighlighted }) => (
        <ChainLogoContainer isHighlighted={isHighlighted} key={chainId}>
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
