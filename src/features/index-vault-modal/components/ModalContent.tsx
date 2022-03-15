import { AnimatePresence } from "framer-motion";

import { useSwapRouterMutations } from "../hooks";

import { Container, ContentAnimatedContainer } from "./ModalContent.styles";
import { Header } from "./Header";
import { SwapSection } from "./SwapSection";
import { ExpandersSection } from "./ExpandersSection";
import { SuccessTransactionSection } from "./SuccessTransactionSection";

export const ModalContent = () => {
  const { swapMutation } = useSwapRouterMutations();

  const { data: isSwapSuccessful = false } = swapMutation ?? {};

  return (
    <Container>
      <Header />
      <AnimatePresence exitBeforeEnter initial={false}>
        <ContentAnimatedContainer
          downDirection={isSwapSuccessful}
          key={isSwapSuccessful.toString()}
        >
          {isSwapSuccessful ? (
            <SuccessTransactionSection />
          ) : (
            <>
              <SwapSection />
              <ExpandersSection />
            </>
          )}
        </ContentAnimatedContainer>
      </AnimatePresence>
    </Container>
  );
};
