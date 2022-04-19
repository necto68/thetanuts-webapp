import type { FC } from "react";
import { useCallback } from "react";

import { useIndexVaultModalState, useSwapRouterConfig } from "../hooks";
import { ChainSelect } from "../../wallet/components";
import { CircleButton, CircleButtonIconType } from "../../shared/components";
import type { ThemeType } from "../types";

import {
  Container,
  Title,
  ButtonsContainer,
  ChainSelectContainer,
} from "./Header.styles";

type HeaderProps = ThemeType;

export const Header: FC<HeaderProps> = ({ theme = "light" }) => {
  const [, setIndexVaultModalState] = useIndexVaultModalState();
  const { supportedChainIds } = useSwapRouterConfig();

  const handleCloseButtonClick = useCallback(() => {
    setIndexVaultModalState((previousState) => ({
      ...previousState,
      isShow: false,
    }));
  }, [setIndexVaultModalState]);

  return (
    <Container>
      <Title theme={theme}>Swap</Title>
      <ButtonsContainer>
        <ChainSelectContainer isShow={theme === "light"}>
          <ChainSelect chainIds={supportedChainIds} />
        </ChainSelectContainer>
        <CircleButton
          iconSize={12}
          iconType={CircleButtonIconType.cross}
          onClick={handleCloseButtonClick}
          primaryColor={theme === "dark" ? "#FFFFFF" : "#5D5D5D"}
        />
      </ButtonsContainer>
    </Container>
  );
};
