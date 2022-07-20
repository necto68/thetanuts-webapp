import { AnimatePresence } from "framer-motion";

import {
  useIndexVaultModalState,
  useSwapRouterConfig,
  useSwapRouterMutations,
} from "../hooks";
import { switchToChain } from "../../wallet/helpers";
import { ModalContentType } from "../types";

import { Header } from "./Header";
import { SwappingContent } from "./SwappingContent";
import { SwapContent } from "./SwapContent";
import { Container, ContentAnimatedContainer } from "./ModalContent.styles";
import { WithdrawContent } from "./WithdrawContent";
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
    isSwapping && contentType !== ModalContentType.withdrawClaim
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
            title="Direct Withdraw"
          />
        );
      case ModalContentType.withdrawClaim:
        return (
          <Header
            chainSwitchVisible={false}
            theme={theme}
            title="Claim Direct Withdraw"
          />
        );
      default:
        return <Header theme={theme} title="Swap" />;
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
