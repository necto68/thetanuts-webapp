import { AnimatePresence } from "framer-motion";

import {
  useIndexVaultModalState,
  useSwapRouterConfig,
  useSwapRouterMutations,
} from "../hooks";
import { switchToChain } from "../../wallet/helpers";

import { Header } from "./Header";
import { SwappingContent } from "./SwappingContent";
import { SwapContent } from "./SwapContent";
import { Container, ContentAnimatedContainer } from "./ModalContent.styles";

export const ModalContent = () => {
  const { swapMutationHash } = useSwapRouterMutations();

  const isSwapping = Boolean(swapMutationHash);
  const theme = isSwapping ? "dark" : "light";

  const { walletChainId, walletProvider } = useSwapRouterConfig();
  const [indexVaultModalState, setIndexVaultModalState] =
    useIndexVaultModalState();

  const onAnimationComplete = () => {
    if (
      indexVaultModalState.chainId &&
      indexVaultModalState.chainId !== walletChainId
    ) {
      void switchToChain(indexVaultModalState.chainId, walletProvider);
    }

    setIndexVaultModalState((previousState) => ({
      ...previousState,
      chainId: null,
    }));
  };

  return (
    <Container theme={theme}>
      <Header theme={theme} />
      <AnimatePresence exitBeforeEnter>
        <ContentAnimatedContainer
          key={isSwapping.toString()}
          onAnimationComplete={onAnimationComplete}
        >
          {isSwapping ? <SwappingContent /> : <SwapContent />}
        </ContentAnimatedContainer>
      </AnimatePresence>
    </Container>
  );
};
