import type { FC } from "react";
import { useCallback } from "react";
import { generatePath } from "react-router-dom";

import type { ChainId } from "../../wallet/constants";
import { IconContainer, Link, Tooltip } from "../../shared/components";
import { useIsMobile } from "../../shared/hooks";
import { chainsMap } from "../../wallet/constants";
import { getLogoBySymbol } from "../../logo/helpers";
import { useIndexVaultModalState } from "../../index-vault-modal/hooks";
import { ModalPathname } from "../../root/types";

import {
  Container,
  ChainLogoContainer,
  HiddenChainsContainer,
  HiddenChainsTitle,
} from "./Chains.styles";

interface ChainsProps {
  chainIds: ChainId[];
  highlightedChainId?: ChainId;
  modalPathname?: typeof ModalPathname[keyof typeof ModalPathname];
  vaultId?: string;
}

export const Chains: FC<ChainsProps> = ({
  chainIds,
  highlightedChainId,
  modalPathname,
  vaultId,
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
      if (vaultId && modalPathname === ModalPathname.indexVaultModal) {
        setIndexVaultModalState((previousState) => ({
          ...previousState,
          indexVaultId: vaultId,
          chainId,
          isShow: true,
        }));
      }
    },
    [vaultId, modalPathname, setIndexVaultModalState]
  );

  const getLink = (chainId: ChainId) =>
    isRouterModal && modalPathname && vaultId
      ? {
          pathname: generatePath(modalPathname, { vaultId }),
          search: `?chain=${chainId}`,
        }
      : {};

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
