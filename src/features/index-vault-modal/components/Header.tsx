import type { FC } from "react";
import { useCallback } from "react";

import { useIndexVaultModalState, useSwapRouterConfig } from "../hooks";
import { ChainSelect } from "../../wallet/components";
import {
  CircleButton,
  CircleButtonIconType,
  Link,
} from "../../shared/components";
import type { ThemeType } from "../types";
import type { ModalContentType } from "../types/modalContentType";

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
  const [indexVaultModalState, setIndexVaultModalState] =
    useIndexVaultModalState();
  const { supportedChainIds } = useSwapRouterConfig();

  const { isRouterModal } = indexVaultModalState;
  const indexVaultRoute =
    isRouterModal && !backContentType ? { pathname: "/" } : {};

  const handleCloseButtonClick = useCallback(() => {
    setIndexVaultModalState((previousState) => ({
      ...previousState,
      isShow: Boolean(backContentType),
      contentType: backContentType,
    }));
  }, [setIndexVaultModalState, backContentType]);

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
        <Link to={indexVaultRoute}>
          <CircleButton
            iconSize={12}
            iconType={
              backContentType
                ? CircleButtonIconType.arrowBack
                : CircleButtonIconType.cross
            }
            onClick={handleCloseButtonClick}
            primaryColor={theme === "dark" ? "#FFFFFF" : "#5D5D5D"}
          />
        </Link>
      </ButtonsContainer>
    </Container>
  );
};
