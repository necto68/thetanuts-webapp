import { useCallback } from "react";

import { useIndexVaultModalState, useSwapRouterConfig } from "../hooks";
import { ChainSelect } from "../../wallet/components";

import {
  Container,
  Title,
  ButtonsContainer,
  CloseButton,
} from "./Header.styles";

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
        <CloseButton onClick={handleCloseButtonClick}>✕</CloseButton>
      </ButtonsContainer>
    </Container>
  );
};
