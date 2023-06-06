import { useEffect } from "react";

import { WithdrawMainButton } from "../../basic-vault-modal/components";
import { useBasicModalState } from "../../basic-vault-modal/hooks";
import { WithdrawMainButtonContainer } from "../../long-vault-modal/components/LongModalContent.styles";
import { Container } from "../../long-option-modal/components/LongOptionModal.styles";

import { ClosePositionOrderInfo } from "./ClosePositionOrderInfo";
import { ModalTitle } from "./ModalTitle";

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
      <ModalTitle />
      {/* <ClosePositionSwitcher /> */}
      {/* <InputCard /> */}
      <ClosePositionOrderInfo />
      <WithdrawMainButtonContainer>
        <WithdrawMainButton />
      </WithdrawMainButtonContainer>
    </Container>
  );
};
