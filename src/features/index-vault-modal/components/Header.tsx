import type { FC } from "react";

import { useSwapRouterConfig } from "../hooks";
import { ChainSelect } from "../../wallet/components";
import type { ThemeType, ModalContentType } from "../types";

import { HeaderNavigationButton } from "./HeaderNavigationButton";
import {
  Container,
  Title,
  ButtonsContainer,
  ChainSelectContainer,
} from "./Header.styles";

interface HeaderProps extends ThemeType {
  title?: string;
  chainSwitchVisible?: boolean;
  backContentType?: ModalContentType;
}

export const Header: FC<HeaderProps> = ({
  theme = "light",
  title = "Swap",
  chainSwitchVisible = true,
  backContentType,
}) => {
  const { supportedChainIds } = useSwapRouterConfig();

  return (
    <Container>
      <Title theme={theme}>{title}</Title>
      <ButtonsContainer>
        {chainSwitchVisible ? (
          <ChainSelectContainer isShow={theme === "light"}>
            <ChainSelect chainIds={supportedChainIds} />
          </ChainSelectContainer>
        ) : (
          ""
        )}
        <HeaderNavigationButton
          backContentType={backContentType}
          theme={theme}
        />
      </ButtonsContainer>
    </Container>
  );
};
