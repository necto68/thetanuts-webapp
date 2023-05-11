/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable complexity */
import type { FC } from "react";
import { useCallback, useState } from "react";
import Lottie from "react-lottie-player";

import { TabType } from "../../basic-vault-modal/types";
import succeedMutation from "../animations/succeedMutation.json";
import { getExplorerUrl } from "../../wallet/helpers";
import { PathType } from "../../wallet/types";
import { useVaultModalState } from "../hooks";
import type { ChainId } from "../../wallet/constants";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks/useBasicModalConfig";
import { Link } from "../../shared/components";
import { getPagePathname } from "../../root/helpers";
import { BasicVaultType } from "../../basic/types";

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
  ModalBoostButton,
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
  const { isRouterModal, vaultType, tabType, isBoostContentShown } =
    vaultModalState;

  const pathname = getPagePathname(vaultType);
  const pageRoute = isRouterModal ? { pathname } : {};

  const { basicVaultQuery, lendingPoolReaderQuery } = useBasicModalConfig();

  const { data: basicVaultData } = basicVaultQuery;
  const { data: lendingPoolReaderData } = lendingPoolReaderQuery;

  const { basicVaultType = BasicVaultType.BASIC } = basicVaultData ?? {};
  const { shouldShowBoost = false } = lendingPoolReaderData ?? {};

  // background animation
  const [isFirstLoopCompleted, setIsFirstLoopCompleted] = useState(false);

  const handleLoopComplete = useCallback(() => {
    if (!isFirstLoopCompleted) {
      setIsFirstLoopCompleted(true);
    }
  }, [isFirstLoopCompleted]);

  const handleModalBoostButtonClick = useCallback(() => {
    setVaultModalState({ ...vaultModalState, isBoostContentShown: true });
  }, [setVaultModalState, vaultModalState]);

  // close button
  const handleCloseButtonClick = useCallback(() => {
    setVaultModalState((previousState) => ({
      ...previousState,
      isShow: false,
    }));
  }, [setVaultModalState]);

  const transactionUrl = getExplorerUrl(PathType.tx, chainId, mutationHash);

  const { currentLiquidityRate = 0 } = lendingPoolReaderData ?? {};
  const formattedAPY = (Number(currentLiquidityRate) * 100).toFixed(2);

  const showModalBoostButton =
    (!isBoostContentShown &&
      tabType === TabType.deposit &&
      shouldShowBoost &&
      basicVaultType === BasicVaultType.BASIC) ||
    false;

  return (
    <Container showModalBoostButton={showModalBoostButton}>
      {/* {isMutationSucceed ? ( */}
      <BackgroundAnimationContainer>
        <Lottie
          animationData={succeedMutation}
          loop
          onLoopComplete={handleLoopComplete}
          play
        />
      </BackgroundAnimationContainer>
      {/* ) : null} */}
      <ContentContainer>
        <InfoContainer>
          <Title>{isMutationSucceed ? successTitle : pendingTitle}</Title>
          {sourceTokenData ? (
            <RatioTitle>{`${sourceTokenData.value} ${sourceTokenData.symbol}`}</RatioTitle>
          ) : null}
          {targetTokenData ? <ToTitle>↓</ToTitle> : null}
          {targetTokenData ? (
            <RatioTitle>{`${targetTokenData.value} ${targetTokenData.symbol}`}</RatioTitle>
          ) : null}
          <TransactionLink
            href={transactionUrl}
            isMutationSucceed={isMutationSucceed}
            target="_blank"
          >
            View Transaction in Explorer
          </TransactionLink>
        </InfoContainer>
        {showModalBoostButton && (
          <ModalBoostButton
            disabled={!isMutationSucceed}
            onClick={handleModalBoostButtonClick}
          >
            {`Boost for ${formattedAPY}% more yield`}
          </ModalBoostButton>

          // ) : (
          //   <Link to={pageRoute}>
          //     <CloseButton
          //       onClick={handleCloseButtonClick}
          //       primaryColor="#FFFFFF"
          //     >
          //       Close
          //     </CloseButton>
          //   </Link>
          // )}
        )}
      </ContentContainer>
    </Container>
  );
};
