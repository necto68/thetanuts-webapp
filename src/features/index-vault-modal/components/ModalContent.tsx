import { AnimatePresence } from "framer-motion";

import { useSwapRouterMutations } from "../hooks";

import { Header } from "./Header";
import { SwappingContent } from "./SwappingContent";
import { SwapContent } from "./SwapContent";
import { Container, ContentAnimatedContainer } from "./ModalContent.styles";

export const ModalContent = () => {
  const { swapMutationHash } = useSwapRouterMutations();

  const isSwapping = Boolean(swapMutationHash);
  const theme = isSwapping ? "dark" : "light";

  return (
    <Container theme={theme}>
      <Header theme={theme} />
      <AnimatePresence exitBeforeEnter initial={false}>
        <ContentAnimatedContainer key={isSwapping.toString()}>
          {isSwapping ? <SwappingContent /> : <SwapContent />}
        </ContentAnimatedContainer>
      </AnimatePresence>
    </Container>
  );
};
