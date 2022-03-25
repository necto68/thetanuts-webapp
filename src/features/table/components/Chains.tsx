import type { FC } from "react";
import { useMediaMatch } from "rooks";

import type { ChainId } from "../../wallet/constants";
import { IconContainer, Tooltip } from "../../shared/components";
import { chainsMap } from "../../wallet/constants";
import { getLogoBySymbol } from "../../logo/helpers";
import { sizes } from "../../shared/constants";

import {
  Container,
  ChainLogoContainer,
  HiddenChainsContainer,
  HiddenChainsTitle,
} from "./Chains.styles";

interface ChainsProps {
  chainIds: ChainId[];
}

export const Chains: FC<ChainsProps> = ({ chainIds }) => {
  const isMobile = useMediaMatch(`(max-width: ${sizes.md}px)`);
  const isShowShortenedChains = isMobile && chainIds.length > 3;

  const visibleChains = isShowShortenedChains ? chainIds.slice(0, 3) : chainIds;
  const hiddenChains = isShowShortenedChains ? chainIds.slice(3) : [];

  const tooltipId = hiddenChains.join("");
  const tooltipContent = hiddenChains
    .map((chain) => chainsMap[chain].title)
    .join(", ");

  return (
    <Container>
      {visibleChains.map((chainId) => (
        <ChainLogoContainer key={chainId}>
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
