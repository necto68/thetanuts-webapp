import { AnimatePresence } from "framer-motion";

import { useSwapRouterMutations, useSwitchChainId } from "../hooks";
import { ModalContentType } from "../types";
import { useVaultModalState } from "../../modal/hooks";

import { Header } from "./Header";
import { SwappingContent } from "./SwappingContent";
import { SwapContent } from "./SwapContent";
import { Container, ContentAnimatedContainer } from "./ModalContent.styles";
import { WithdrawContent } from "./WithdrawContent";
import { WithdrawClaimContent } from "./WithdrawClaimContent";

export const ModalContent = () => {
  const { swapMutationHash } = useSwapRouterMutations();

  const isSwapping = Boolean(swapMutationHash);

  const switchChainId = useSwitchChainId();

  const [vaultModalState] = useVaultModalState();

  const { contentType = ModalContentType.swap } = vaultModalState;

  const renderModalHeader = (type: ModalContentType) => {
    switch (type) {
      case ModalContentType.withdraw:
        return (
          <Header
            backContentType={ModalContentType.swap}
            isShowChainSelect={false}
            title="Direct Withdraw"
          />
        );
      case ModalContentType.withdrawSummary:
        return (
          <Header
            backContentType={ModalContentType.withdraw}
            isShowChainSelect={false}
            title="Direct Withdraw"
          />
        );
      case ModalContentType.withdrawClaim:
        return (
          <Header isShowChainSelect={false} title="Claim Direct Withdraw" />
        );
      default:
        return <Header isShowChainSelect={!isSwapping} title="Swap" />;
    }
  };

  const renderModalContent = (type: ModalContentType) => {
    switch (type) {
      case ModalContentType.withdraw:
      case ModalContentType.withdrawSummary:
        return <WithdrawContent />;
      case ModalContentType.withdrawClaim:
        return <WithdrawClaimContent />;
      default:
        return isSwapping ? <SwappingContent /> : <SwapContent />;
    }
  };

  return (
    <Container>
      {renderModalHeader(contentType)}
      <AnimatePresence exitBeforeEnter>
        <ContentAnimatedContainer
          key={isSwapping.toString()}
          onAnimationComplete={switchChainId}
        >
          {renderModalContent(contentType)}
        </ContentAnimatedContainer>
      </AnimatePresence>
    </Container>
  );
};
