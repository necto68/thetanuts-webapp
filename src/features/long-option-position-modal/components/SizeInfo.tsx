import Big from "big.js";

import { useBasicModalState } from "../../basic-vault-modal/hooks";
import {
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../long-option-modal/components/OrderInfo.styles";
import { assetFormatter } from "../../shared/helpers";

export const SizeInfo = () => {
  const { inputValue, tokenData } = useBasicModalState();

  const loadingPlaceholder = ".....";

  if (!tokenData) {
    return (
      <InfoContainer>
        <InfoTitle>Size</InfoTitle>
        <InfoValue>{loadingPlaceholder}</InfoValue>
      </InfoContainer>
    );
  }

  const debtTokenBalance = tokenData.balance ?? new Big(0);
  const optionSymbol = tokenData.symbol;

  const withdrawAmount = new Big(inputValue || 0);

  const formattedBalance = `${assetFormatter.format(
    debtTokenBalance.toNumber()
  )} ${optionSymbol}`;

  const finalAmount = debtTokenBalance.sub(withdrawAmount);

  const formattedFinalAmount = `${assetFormatter.format(
    finalAmount.toNumber()
  )} ${optionSymbol}`;

  return (
    <InfoContainer>
      <InfoTitle>Size</InfoTitle>
      <InfoValue>{`${formattedBalance} → ${formattedFinalAmount}`}</InfoValue>
    </InfoContainer>
  );
};
