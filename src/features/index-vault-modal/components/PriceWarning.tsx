import type { FC } from "react";

import { IconContainer } from "../../shared/components";
import { chainsMap } from "../../wallet/constants";
import { Warning } from "../icons";
import {
  useIndexVaultModalState,
  useSwapRouterConfig,
  useSwapRouterState,
} from "../hooks";
import { ModalContentType } from "../types/modalContentType";

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
}

export const PriceWarning: FC<PriceWarningProps> = ({
  isShowDirectDepositProposal,
  isShowDirectWithdrawProposal,
  isShowMaxVaultCapReachedTitle = true,
}) => {
  const { indexVaultQuery } = useSwapRouterConfig();
  const { sourceData } = useSwapRouterState();
  const [, setIndexVaultModalState] = useIndexVaultModalState();

  const { data } = indexVaultQuery;
  const {
    chainId = null,
    totalRemainder = Number.MAX_SAFE_INTEGER,
    assetSymbol = "",
  } = data ?? {};

  const { symbol = "" } = sourceData ?? {};

  const isStableCoin = ["USDC", "BUSD"].includes(symbol);

  const chainTitle = chainId ? chainsMap[chainId].title : "";

  const startWithdraw = () => {
    setIndexVaultModalState((previousState) => ({
      ...previousState,
      contentType: ModalContentType.withdraw,
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
          &nbsp;to Direct Withdraw for minimal slippage.
        </WarningTitle>
      ) : null}
      {isShowMaxVaultCapReachedTitle ? (
        <WarningTitle>
          You can only deposit{" "}
          <WarningLink>
            {totalRemainder} {assetSymbol}
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
