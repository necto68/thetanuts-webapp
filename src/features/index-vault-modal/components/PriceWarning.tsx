import type { FC } from "react";

import { IconContainer } from "../../shared/components";
import type { ChainId } from "../../wallet/constants";
import { chainsMap } from "../../wallet/constants";
import { Warning } from "../icons";
import type { Token } from "../types";
import { ModalContentType } from "../types";

import {
  Container,
  WarningTitle,
  WarningLink,
  WarningAction,
} from "./TextWarning.styles";

interface PriceWarningProps {
  isShowDirectDepositProposal: boolean;
  isShowDirectWithdrawProposal: boolean;
  isShowMaxVaultCapReachedTitle: boolean;
  isShowSwapProposal: boolean;
  sourceTokenData: Token | undefined;
  remainderValue?: number;
  vaultChainId?: ChainId;
}

export const PriceWarning: FC<PriceWarningProps> = ({
  isShowDirectDepositProposal,
  isShowDirectWithdrawProposal,
  isShowSwapProposal,
  isShowMaxVaultCapReachedTitle,
  sourceTokenData,
  remainderValue = 0,
  vaultChainId,
}) => {
  const { symbol = "" } = sourceTokenData ?? {};

  const isStableCoin = ["USDC", "BUSD"].includes(symbol);

  const chainTitle = vaultChainId ? chainsMap[vaultChainId].title : "";

  const startWithdraw = () => {
    setIndexVaultModalState((previousState) => ({
      ...previousState,
      contentType: ModalContentType.withdraw,
    }));
  };

  const backToSwap = () => {
    setIndexVaultModalState((previousState) => ({
      ...previousState,
      contentType: ModalContentType.swap,
    }));
  };

  return (
    <Container>
      <IconContainer height={14} width={16}>
        <Warning />
      </IconContainer>
      {isShowDirectDepositProposal ? (
        <WarningTitle>
          High Price Impact!{" "}
          <WarningLink
            href={
              isStableCoin
                ? "https://stargate.finance/transfer"
                : "https://portalbridge.com/#/transfer"
            }
            target="_blank"
          >
            Click here
          </WarningLink>
          {` to bridge your ${symbol} over to `}
          <WarningLink>{`${chainTitle} network`}</WarningLink> for optimal swap.
        </WarningTitle>
      ) : null}
      {isShowDirectWithdrawProposal ? (
        <WarningTitle>
          High Slippage.
          <WarningAction onClick={startWithdraw}>Click Here</WarningAction>
          &nbsp;to Direct Withdraw for minimal slippage
        </WarningTitle>
      ) : null}
      {isShowSwapProposal ? (
        <WarningTitle>
          Low Swap Value. Click Here
          <WarningAction onClick={backToSwap}>Click Here</WarningAction>
          &nbsp;to swap instead
        </WarningTitle>
      ) : null}
      {isShowMaxVaultCapReachedTitle ? (
        <WarningTitle>
          You can only deposit{" "}
          <WarningLink>
            {remainderValue} {symbol}
          </WarningLink>
          . If you want to swap more - please{" "}
          <WarningLink href="https://t.me/officialThetanutsFinance">
            contact us
          </WarningLink>
          .
        </WarningTitle>
      ) : null}
    </Container>
  );
};
