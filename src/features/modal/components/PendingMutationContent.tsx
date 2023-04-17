import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import Lottie from "react-lottie-player";

import pendingMutationNew from "../animations/pendingMutationNew.json";
import succeedMutationNew from "../animations/succeedMutationNew.json";
import { getExplorerUrl } from "../../wallet/helpers";
import { PathType } from "../../wallet/types";
import { Link } from "../../shared/components";
import { useVaultModalState } from "../hooks";
import type { ChainId } from "../../wallet/constants";
import { getPagePathname } from "../../root/helpers";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks/useBasicModalConfig";

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
  const { tabType, vaultType, isBoostContentShown } = vaultModalState;
  const { basicVaultReaderQuery, lendingPoolReaderQuery } = useBasicModalConfig();

  const { data: lendingPoolReaderData, isLoading: isBasicVaultLoading } = lendingPoolReaderQuery;
  const { aTokenAddress = '' } = lendingPoolReaderData ?? {};

  const pathname = getPagePathname(vaultType);
  // const pageRoute = isRouterModal ? { pathname } : {};

  // background animation
  const [isFirstLoopCompleted, setIsFirstLoopCompleted] = useState(false);

  const handleLoopComplete = useCallback(() => {
    if (!isFirstLoopCompleted) {
      setIsFirstLoopCompleted(true);
    }
  }, [isFirstLoopCompleted]);

  const backgroundAnimationSegments = useMemo<[number, number]>(
    () => (isFirstLoopCompleted ? [0, 100] : [0, 100]),
    [isFirstLoopCompleted]
  );

  const handleCloseButtonClick = useCallback(() => {
    setVaultModalState({...vaultModalState, 
      isBoostContentShown: true});
  }, [setVaultModalState, vaultModalState]);

  const transactionUrl = getExplorerUrl(PathType.tx, chainId, mutationHash);

  const { currentLiquidityRate = 0 } = lendingPoolReaderData ?? {};
  const formattedAPY = (Number(currentLiquidityRate) * 100).toFixed(2);

  const showCloseButton = !isBoostContentShown && tabType === 'deposit' && aTokenAddress !== '0x0000000000000000000000000000000000000000';

  return (
    <Container showCloseButton={showCloseButton}>
      {/* {isMutationSucceed ? ( */}
        <BackgroundAnimationContainer>
          <Lottie
            animationData={succeedMutationNew}
            loop
            onLoopComplete={handleLoopComplete}
            play
            // segments={backgroundAnimationSegments}
          />
        </BackgroundAnimationContainer>
      {/* ) : null} */}
      <ContentContainer>
        <InfoContainer>
          {/* <AnimationContainer isShow={!isMutationSucceed}>
            <Lottie animationData={pendingMutationNew} loop play />
          </AnimationContainer> */}
          <Title>
            {isMutationSucceed ? successTitle : pendingTitle}
            {sourceTokenData ? (
              <RatioTitle>{`${sourceTokenData.value} ${sourceTokenData.symbol}`}</RatioTitle>
            ) : null}
            {targetTokenData ? <ToTitle>↓</ToTitle> : null}
            {targetTokenData ? (
              <RatioTitle>{`${targetTokenData.value} ${targetTokenData.symbol}`}</RatioTitle>
            ) : null}
          </Title>
          <TransactionLink
            href={transactionUrl}
            isMutationSucceed={isMutationSucceed}
            target="_blank"
          >
            View Transaction in Explorer
          </TransactionLink>
        </InfoContainer>
        {showCloseButton && (
          <CloseButton
            onClick={handleCloseButtonClick}
            disabled={!isMutationSucceed ? true : false}
          >
            {`Boost for ${formattedAPY}% more yield`}
          </CloseButton>
        )}
      </ContentContainer>
    </Container>
  );
};
