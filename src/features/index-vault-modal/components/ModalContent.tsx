import { AnimatePresence } from "framer-motion";

import {
  useIndexVaultModalState,
  useSwapRouterConfig,
  useSwapRouterMutations,
} from "../hooks";
import { switchToChain } from "../../wallet/helpers";
import { ModalContentType } from "../types/modalContentType";

import { Header } from "./Header";
import { SwappingContent } from "./SwappingContent";
import { SwapContent } from "./SwapContent";
import { Container, ContentAnimatedContainer } from "./ModalContent.styles";
import { WithdrawContent } from "./WithdrawContent";
import { WithdrawSummary } from "./WithdrawSummary";
import { WithdrawClaimContent } from "./WithdrawClaimContent";

export const ModalContent = () => {
  const { swapMutationHash } = useSwapRouterMutations();

  const isSwapping = Boolean(swapMutationHash);

  const { walletChainId, walletProvider } = useSwapRouterConfig();
  const [indexVaultModalState, setIndexVaultModalState] =
    useIndexVaultModalState();
  const { chainId } = indexVaultModalState;

  const { contentType = ModalContentType.swap } = indexVaultModalState;

  const theme =
    (isSwapping && contentType !== ModalContentType.withdrawClaim) ||
    contentType === ModalContentType.withdrawSummary
      ? "dark"
      : "light";

  const onAnimationComplete = () => {
    if (chainId && chainId !== walletChainId) {
      void switchToChain(chainId, walletProvider);
    }

    setIndexVaultModalState((previousState) => ({
      ...previousState,
      chainId: null,
    }));
  };

  const renderModalHeader = (type: ModalContentType) => {
    switch (type) {
      case ModalContentType.withdraw:
        return (
          <Header
            backContentType={ModalContentType.swap}
            chainSwitchVisible={false}
            theme={theme}
            title="Direct Withdraw"
          />
        );
      case ModalContentType.withdrawSummary:
        return (
          <Header
            backContentType={ModalContentType.withdraw}
            chainSwitchVisible={false}
            theme={theme}
            title="Direct Withdraw Summary"
          />
        );
      case ModalContentType.withdrawClaim:
        return (
          <Header chainSwitchVisible={false} theme={theme} title="Claim" />
        );
      default:
        return <Header theme={theme} title="Swap" />;
    }
  };

  const renderModalContent = (type: ModalContentType) => {
    switch (type) {
      case ModalContentType.withdraw:
        return <WithdrawContent />;
      case ModalContentType.withdrawSummary:
        return <WithdrawSummary />;
      case ModalContentType.withdrawClaim:
        return <WithdrawClaimContent />;
      default:
        return isSwapping ? <SwappingContent /> : <SwapContent />;
    }
  };

  return (
    <Container theme={theme}>
      {renderModalHeader(contentType)}
      <AnimatePresence exitBeforeEnter>
        <ContentAnimatedContainer
          key={isSwapping.toString()}
          onAnimationComplete={onAnimationComplete}
        >
          {renderModalContent(contentType)}
        </ContentAnimatedContainer>
      </AnimatePresence>
    </Container>
  );
};
