import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import Lottie from "react-lottie-player";

import pendingMutation from "../animations/pendingMutation.json";
import succeedMutation from "../animations/succeedMutation.json";
import { getExplorerUrl } from "../../wallet/helpers";
import { PathType } from "../../wallet/types";
import { Link } from "../../shared/components";
import { useVaultModalState } from "../hooks";
import type { ChainId } from "../../wallet/constants";
import { getPagePathname } from "../../root/helpers";

import {
  Container,
  BackgroundAnimationContainer,
  InfoContainer,
  ContentContainer,
  Title,
  AnimationContainer,
  RatioTitleContainer,
  RatioTitle,
  ToTitle,
  TransactionLink,
  CloseButton,
} from "./PendingMutationContent.styles";

interface TokenData {
  value: string;
  symbol: string;
}
interface PendingMutationContentProps {
  chainId: ChainId;
  mutationHash: string;
  isMutationSucceed: boolean;
  sourceTokenData?: TokenData;
  targetTokenData?: TokenData;
  pendingTitle: string;
  successTitle: string;
}

export const PendingMutationContent: FC<PendingMutationContentProps> = ({
  chainId,
  mutationHash,
  isMutationSucceed,
  sourceTokenData,
  targetTokenData,
  pendingTitle,
  successTitle,
}) => {
  const [vaultModalState, setVaultModalState] = useVaultModalState();
  const { isRouterModal, vaultType } = vaultModalState;

  const pathname = getPagePathname(vaultType);
  const pageRoute = isRouterModal ? { pathname } : {};

  // background animation
  const [isFirstLoopCompleted, setIsFirstLoopCompleted] = useState(false);

  const handleLoopComplete = useCallback(() => {
    if (!isFirstLoopCompleted) {
      setIsFirstLoopCompleted(true);
    }
  }, [isFirstLoopCompleted]);

  const backgroundAnimationSegments = useMemo<[number, number]>(
    () => (isFirstLoopCompleted ? [38, 80] : [0, 80]),
    [isFirstLoopCompleted]
  );

  // close button
  const handleCloseButtonClick = useCallback(() => {
    setVaultModalState((previousState) => ({
      ...previousState,
      isShow: false,
    }));
  }, [setVaultModalState]);

  const transactionUrl = getExplorerUrl(PathType.tx, chainId, mutationHash);

  return (
    <Container>
      {isMutationSucceed ? (
        <BackgroundAnimationContainer>
          <Lottie
            animationData={succeedMutation}
            loop
            onLoopComplete={handleLoopComplete}
            play
            segments={backgroundAnimationSegments}
          />
        </BackgroundAnimationContainer>
      ) : null}
      <ContentContainer>
        <InfoContainer>
          <AnimationContainer isShow={!isMutationSucceed}>
            <Lottie animationData={pendingMutation} loop play />
          </AnimationContainer>
          <Title>{isMutationSucceed ? successTitle : pendingTitle}</Title>
          <RatioTitleContainer>
            {sourceTokenData ? (
              <RatioTitle>{`${sourceTokenData.value} ${sourceTokenData.symbol}`}</RatioTitle>
            ) : null}
            {targetTokenData ? <ToTitle>↓</ToTitle> : null}
            {targetTokenData ? (
              <RatioTitle>{`${targetTokenData.value} ${targetTokenData.symbol}`}</RatioTitle>
            ) : null}
          </RatioTitleContainer>
          <TransactionLink
            href={transactionUrl}
            isMutationSucceed={isMutationSucceed}
            target="_blank"
          >
            View Transaction in Explorer
          </TransactionLink>
        </InfoContainer>
        <Link to={pageRoute}>
          <CloseButton onClick={handleCloseButtonClick} primaryColor="#FFFFFF">
            Close
          </CloseButton>
        </Link>
      </ContentContainer>
    </Container>
  );
};
