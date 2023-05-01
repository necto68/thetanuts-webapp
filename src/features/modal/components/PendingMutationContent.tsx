import type { FC } from "react";
import { useCallback, useState } from "react";
import Lottie from "react-lottie-player";

import succeedMutationNew from "../animations/succeedMutationNew.json";
import { getExplorerUrl } from "../../wallet/helpers";
import { PathType } from "../../wallet/types";
import { useVaultModalState } from "../hooks";
import type { ChainId } from "../../wallet/constants";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks/useBasicModalConfig";

import {
  Container,
  BackgroundAnimationContainer,
  InfoContainer,
  ContentContainer,
  Title,
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
  const { tabType, isBoostContentShown } = vaultModalState;
  const { lendingPoolReaderQuery } = useBasicModalConfig();

  const { data: lendingPoolReaderData } = lendingPoolReaderQuery;
  const { aTokenAddress = "" } = lendingPoolReaderData ?? {};

  // background animation
  const [isFirstLoopCompleted, setIsFirstLoopCompleted] = useState(false);

  const handleLoopComplete = useCallback(() => {
    if (!isFirstLoopCompleted) {
      setIsFirstLoopCompleted(true);
    }
  }, [isFirstLoopCompleted]);

  const handleCloseButtonClick = useCallback(() => {
    setVaultModalState({ ...vaultModalState, isBoostContentShown: true });
  }, [setVaultModalState, vaultModalState]);

  const transactionUrl = getExplorerUrl(PathType.tx, chainId, mutationHash);

  const { currentLiquidityRate = 0 } = lendingPoolReaderData ?? {};
  const formattedAPY = (Number(currentLiquidityRate) * 100).toFixed(2);

  const showCloseButton =
    !isBoostContentShown &&
    tabType === "deposit" &&
    aTokenAddress !== "0x0000000000000000000000000000000000000000";

  return (
    <Container showCloseButton={showCloseButton}>
      {/* {isMutationSucceed ? ( */}
      <BackgroundAnimationContainer>
        <Lottie
          animationData={succeedMutationNew}
          loop
          onLoopComplete={handleLoopComplete}
          play
        />
      </BackgroundAnimationContainer>
      {/* ) : null} */}
      <ContentContainer>
        <InfoContainer>
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
            disabled={!isMutationSucceed}
            onClick={handleCloseButtonClick}
          >
            {`Boost for ${formattedAPY}% more yield`}
          </CloseButton>
        )}
      </ContentContainer>
    </Container>
  );
};
