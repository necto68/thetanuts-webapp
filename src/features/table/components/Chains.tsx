import type { FC } from "react";
import { createElement } from "react";

import type { ChainId } from "../../wallet/constants";
import { IconContainer } from "../../shared/components";
import { chainsMap } from "../../wallet/constants";

import { Container, ChainLogoContainer } from "./Chains.styles";

interface ChainsProps {
  chainIds: ChainId[];
}

export const Chains: FC<ChainsProps> = ({ chainIds }) => (
  <Container>
    {chainIds.map((chainId) => (
      <ChainLogoContainer key={chainId}>
        <IconContainer height={18} width={18}>
          {createElement(chainsMap[chainId].logo)}
        </IconContainer>
      </ChainLogoContainer>
    ))}
  </Container>
);
