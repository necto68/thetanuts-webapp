import { useCallback } from "react";

import { useIndexVaultModalState, useSwapRouterConfig } from "../hooks";
import { ChainSelect } from "../../wallet/components";
import { CircleButton, CircleButtonIconType } from "../../shared/components";

import { ButtonsContainer, Container, Title } from "./Header.styles";

export const Header = () => {
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
      <Title>Swap Token</Title>
      <ButtonsContainer>
        <ChainSelect chainIds={supportedChainIds} />
        <CircleButton
          iconSize={16}
          iconType={CircleButtonIconType.cross}
          onClick={handleCloseButtonClick}
          primaryColor="#5D5D5D"
        />
      </ButtonsContainer>
    </Container>
  );
};
