import type { FC } from "react";
import { useCallback } from "react";

import type { ChainId } from "../../wallet/constants";
import { IconContainer, Link, Tooltip } from "../../shared/components";
import { useIsMobile } from "../../shared/hooks";
import { chainsMap } from "../../wallet/constants";
import { getLogoBySymbol } from "../../logo/helpers";
import { useIndexVaultModalState } from "../../index-vault-modal/hooks";

import {
  Container,
  ChainLogoContainer,
  HiddenChainsContainer,
  HiddenChainsTitle,
} from "./Chains.styles";

interface ChainsProps {
  chainIds: ChainId[];
  indexVaultId?: string;
  highlightedChainId?: ChainId;
}

export const Chains: FC<ChainsProps> = ({
  chainIds,
  highlightedChainId,
  indexVaultId,
}) => {
  const isMobile = useIsMobile();
  const [indexVaultModalState, setIndexVaultModalState] =
    useIndexVaultModalState();
  const { isRouterModal } = indexVaultModalState;

  const isShowShortenedChains = isMobile && chainIds.length > 3;
  const visibleChains = isShowShortenedChains ? chainIds.slice(0, 3) : chainIds;

  const hiddenChains = isShowShortenedChains ? chainIds.slice(3) : [];
  const tooltipId = hiddenChains.join("");

  const tooltipContent = hiddenChains
    .map((chainId) => chainsMap[chainId].title)
    .join(", ");

  const handleChainClick = useCallback(
    (chainId: ChainId) => {
      if (indexVaultId) {
        setIndexVaultModalState((previousState) => ({
          ...previousState,
          indexVaultId,
          chainId,
          isShow: true,
        }));
      }
    },
    [indexVaultId, setIndexVaultModalState]
  );

  return (
    <Container>
      {visibleChains.map((chainId) => (
        <Link
          key={chainId}
          to={
            isRouterModal && indexVaultId
              ? {
                  pathname: `/stronghold/${indexVaultId}`,
                  search: `?chain=${chainId}`,
                }
              : {}
          }
        >
          <ChainLogoContainer
            isClickable={Boolean(indexVaultId)}
            isHighlighted={chainId === highlightedChainId}
            onClick={() => {
              handleChainClick(chainId);
            }}
          >
            <IconContainer height={18} width={18}>
              {getLogoBySymbol(chainsMap[chainId].symbol)}
            </IconContainer>
          </ChainLogoContainer>
        </Link>
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
