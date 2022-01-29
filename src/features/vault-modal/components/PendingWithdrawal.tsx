import type { FC } from "react";
import { AnimatePresence } from "framer-motion";

import { LoadingButton } from "../../shared/components";
import type { Vault } from "../../vault/types";
import { useWithdrawState } from "../hooks";

import {
  Container,
  InfoContainer,
  PendingWithdrawalTitle,
  AssetTitle,
  ReturnLaterTitle,
  ButtonsContainer,
} from "./PendingWithdrawal.styles";

type PendingWithdrawalProps = Pick<
  Vault,
  "depositSymbol" | "isReadyForWithdraw" | "userPendingWithdrawal"
>;

export const PendingWithdrawal: FC<PendingWithdrawalProps> = ({
  userPendingWithdrawal,
  depositSymbol = "",
  isReadyForWithdraw,
}) => {
  const withdrawState = useWithdrawState();

  if (!withdrawState || typeof userPendingWithdrawal === "undefined") {
    return null;
  }

  if (userPendingWithdrawal.eq(0)) {
    return <AnimatePresence initial={false} />;
  }

  const pendingWithdrawalString = userPendingWithdrawal.round(4).toString();

  const { isCancelingWithdraw, isWithdrawing, cancelWithdraw, withdraw } =
    withdrawState;

  return (
    <AnimatePresence initial={false}>
      <Container>
        <InfoContainer>
          <PendingWithdrawalTitle>
            You have a pending withdrawal:
          </PendingWithdrawalTitle>
          <AssetTitle>
            {`${pendingWithdrawalString} ${depositSymbol}`}
          </AssetTitle>
          {isReadyForWithdraw ? (
            <ReturnLaterTitle>You can claim your withdrawal</ReturnLaterTitle>
          ) : (
            <ReturnLaterTitle>
              Please return when epoch will expiry to claim your withdrawal
            </ReturnLaterTitle>
          )}
        </InfoContainer>
        <ButtonsContainer>
          {!isReadyForWithdraw ? (
            <LoadingButton
              disabled={isCancelingWithdraw}
              isLoading={isCancelingWithdraw}
              onClick={cancelWithdraw}
              primaryColor="#ff4d4d"
            >
              Cancel
            </LoadingButton>
          ) : null}
          {isReadyForWithdraw ? (
            <LoadingButton
              disabled={isWithdrawing}
              isLoading={isWithdrawing}
              onClick={withdraw}
              primaryColor="#00ff3d"
            >
              Claim
            </LoadingButton>
          ) : null}
        </ButtonsContainer>
      </Container>
    </AnimatePresence>
  );
};
