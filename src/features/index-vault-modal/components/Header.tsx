import { useCallback } from "react";

import { useIndexVaultModalState, useSwapRouterConfig } from "../hooks";
import { ChainSelect } from "../../wallet/components";

import {
  Container,
  ChainSelectContainer,
  TitleContainer,
  CloseButtonContainer,
  Title,
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
      <ChainSelectContainer>
        <ChainSelect chainIds={supportedChainIds} />
      </ChainSelectContainer>
      <TitleContainer>
        <Title>Swap Token</Title>
      </TitleContainer>
      <CloseButtonContainer>
        <CloseButton onClick={handleCloseButtonClick}>✕</CloseButton>
      </CloseButtonContainer>
    </Container>
  );
};
