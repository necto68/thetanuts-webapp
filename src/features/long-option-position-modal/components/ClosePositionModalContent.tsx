import { useEffect } from "react";

import { WithdrawMainButton } from "../../basic-vault-modal/components";
import { Container } from "../../basic-vault-modal/components/BasicModalContent.styles";
import { useBasicModalState } from "../../basic-vault-modal/hooks";
import {
  WarningTitle,
  WithdrawMainButtonContainer,
} from "../../long-vault-modal/components/LongModalContent.styles";

import { ClosePositionOrderInfo } from "./ClosePositionOrderInfo";

// import { Container } from "../../long-option-modal/components/LongOptionModal.styles";

export const ClosePositionModalContent = () => {
  const { setInputValue, tokenData } = useBasicModalState();

  // TODO: remove this effect when we will support partial withdraw
  useEffect(() => {
    const debtTokenBalance = tokenData?.balance;
    if (debtTokenBalance) {
      setTimeout(() => {
        setInputValue(debtTokenBalance.toString());
      }, 100);
    }
  }, [tokenData, setInputValue]);

  return (
    <Container>
      {/* <ClosePositionSwitcher /> */}
      {/* <InputCard /> */}
      <ClosePositionOrderInfo />
      <WithdrawMainButtonContainer>
        <WithdrawMainButton />
        <WarningTitle>
          Warning - You would give up any potential upside if you close your
          position mid epoch
        </WarningTitle>
      </WithdrawMainButtonContainer>
    </Container>
  );
};
