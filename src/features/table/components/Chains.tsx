import type { FC } from "react";
import { useCallback } from "react";
import { generatePath } from "react-router-dom";

import type { ChainId } from "../../wallet/constants";
import { chainIconSymbols, chainsMap } from "../../wallet/constants";
import { IconContainer, Link, Tooltip } from "../../shared/components";
import { useIsMobile } from "../../shared/hooks";
import { getLogoBySymbol } from "../../logo/helpers";
import type { VaultModalType } from "../../root/types";
import { useVaultModalState } from "../../modal/hooks";
import { getModalPathname } from "../../root/helpers";

import {
  ChainLogoContainer,
  Container,
  HiddenChainsContainer,
  HiddenChainsTitle,
} from "./Chains.styles";

interface ChainsProps {
  chainIds: ChainId[];
  highlightedChainId?: ChainId;
  vaultType?: VaultModalType;
  vaultId?: string;
}

export const Chains: FC<ChainsProps> = ({
  chainIds,
  highlightedChainId,
  vaultType,
  vaultId,
}) => {
  const isMobile = useIsMobile();
  const [vaultModalState, setVaultModalState] = useVaultModalState();
  const { isRouterModal } = vaultModalState;

  const isShowShortenedChains = isMobile && chainIds.length > 3;
  const visibleChains = isShowShortenedChains ? chainIds.slice(0, 3) : chainIds;

  const hiddenChains = isShowShortenedChains ? chainIds.slice(3) : [];
  const tooltipId = hiddenChains.join("");

  const tooltipContent = hiddenChains
    .map((chainId) => chainsMap[chainId].title)
    .join(", ");

  const handleChainClick = useCallback(
    (chainId: ChainId) => {
      if (vaultId && vaultType) {
        setVaultModalState((previousState) => ({
          ...previousState,
          vaultType,
          vaultId,
          chainId,
          isShow: true,
        }));
      }
    },
    [vaultId, vaultType, setVaultModalState]
  );

  const getLink = (chainId: ChainId) => {
    if (isRouterModal && vaultType && vaultId) {
      const modalPathname = getModalPathname(vaultType);
      const pathname = generatePath(modalPathname, { vaultId });

      return {
        pathname,
        search: `?chain=${chainId}`,
      };
    }

    return {};
  };

  return (
    <Container>
      {visibleChains.map((chainId) => (
        <Link key={chainId} to={getLink(chainId)}>
          <ChainLogoContainer
            isClickable={Boolean(vaultId)}
            isHighlighted={chainId === highlightedChainId}
            onClick={() => {
              handleChainClick(chainId);
            }}
          >
            <IconContainer height={28} width={28}>
              {getLogoBySymbol(chainIconSymbols[chainId])}
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
