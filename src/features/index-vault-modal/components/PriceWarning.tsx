import type { FC } from "react";

import { links } from "../../shared/constants";
import { IconContainer } from "../../shared/components";
import type { ChainId } from "../../wallet/constants";
import { chainsMap } from "../../wallet/constants";
import { Warning } from "../icons";
import type { Token } from "../types";
import { ModalContentType } from "../types";
import { useVaultModalState } from "../../modal/hooks";
import { useBridgeUrl } from "../hooks/useBridgeUrl";
import { VaultModalType } from "../../root/types";

import {
  Container,
  WarningTitle,
  WarningLink,
  WarningAction,
} from "./TextWarning.styles";

const depositTitle = {
  [VaultModalType.index]: "swap",
  [VaultModalType.basic]: "deposit",
  [VaultModalType.degen]: "deposit",
  [VaultModalType.long]: "supply",
};

interface PriceWarningProps {
  isShowDirectDepositProposal: boolean;
  isShowDirectWithdrawProposal: boolean;
  isShowMaxVaultCapReachedTitle: boolean;
  isShowSwapProposal: boolean;
  sourceTokenData: Token | undefined;
  remainderValue?: number;
  vaultChainId?: ChainId;
  vaultType: VaultModalType;
}

export const PriceWarning: FC<PriceWarningProps> = ({
  isShowDirectDepositProposal,
  isShowDirectWithdrawProposal,
  isShowSwapProposal,
  isShowMaxVaultCapReachedTitle,
  sourceTokenData,
  remainderValue = 0,
  vaultChainId,
  vaultType,
}) => {
  const [, setVaultModalState] = useVaultModalState();

  const bridgeUrl = useBridgeUrl();

  const { symbol = "" } = sourceTokenData ?? {};

  const chainTitle = vaultChainId ? chainsMap[vaultChainId].title : "";

  const startWithdraw = () => {
    setVaultModalState((previousState) => ({
      ...previousState,
      contentType: ModalContentType.withdraw,
    }));
  };

  const backToSwap = () => {
    setVaultModalState((previousState) => ({
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
          <WarningLink href={bridgeUrl} target="_blank">
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
          You can only {depositTitle[vaultType]}{" "}
          <WarningLink>
            {remainderValue} {symbol}
          </WarningLink>
          . If you want to {depositTitle[vaultType]} more - please{" "}
          <WarningLink href={links.discord}>contact us</WarningLink>.
        </WarningTitle>
      ) : null}
    </Container>
  );
};
