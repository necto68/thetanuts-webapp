import type { FC } from "react";

import { useSwapRouterConfig } from "../hooks";
import { ChainSelect } from "../../wallet/components";
import type { ModalContentType } from "../types";

import { HeaderNavigationButton } from "./HeaderNavigationButton";
import {
  ButtonsContainer,
  ChainSelectContainer,
  Container,
  Title,
} from "./Header.styles";

interface HeaderProps {
  title?: string;
  isShowChainSelect?: boolean;
  backContentType?: ModalContentType;
}

export const Header: FC<HeaderProps> = ({
  title = "Swap",
  isShowChainSelect = true,
  backContentType,
}) => {
  const { supportedChainIds } = useSwapRouterConfig();

  return (
    <Container>
      <Title>{title}</Title>
      <ButtonsContainer>
        <ChainSelectContainer isShow={isShowChainSelect}>
          <ChainSelect chainIds={supportedChainIds} />
        </ChainSelectContainer>
        <HeaderNavigationButton backContentType={backContentType} />
      </ButtonsContainer>
    </Container>
  );
};
