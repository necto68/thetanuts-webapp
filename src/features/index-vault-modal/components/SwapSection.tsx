import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { IconContainer } from "../../shared/components";
import { Flip } from "../icons";

import { SwapInputCard } from "./SwapInputCard";
import { VaultInfo } from "./VaultInfo";
import { SwapButton } from "./SwapButton";
import {
  Container,
  SwapInputsContainer,
  BalanceContainer,
  BalanceTitle,
  FlipButton,
  FlipButtonContainer,
  SwapInputCardAnimateContainer,
} from "./SwapSection.styles";

export const SwapSection = () => {
  const [keys, setKeys] = useState(["1", "2"]);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Container>
      <SwapInputsContainer>
        <BalanceContainer>
          <BalanceTitle>Pay</BalanceTitle>
          <BalanceTitle>Balance: 0</BalanceTitle>
        </BalanceContainer>
        <AnimatePresence exitBeforeEnter initial={false}>
          <SwapInputCardAnimateContainer
            downDirection={isFlipped}
            key={keys[0]}
          >
            <SwapInputCard />
          </SwapInputCardAnimateContainer>
        </AnimatePresence>
        <FlipButtonContainer>
          <FlipButton
            isFlipped={isFlipped}
            onClick={() => {
              setKeys(([first, second]) => [second, first]);
              setIsFlipped((previousState) => !previousState);
            }}
          >
            <IconContainer height={20} width={20}>
              <Flip />
            </IconContainer>
          </FlipButton>
        </FlipButtonContainer>
        <BalanceContainer key="BalanceContainer">
          <BalanceTitle>Receive</BalanceTitle>
          <BalanceTitle>Balance: 0</BalanceTitle>
        </BalanceContainer>
        <AnimatePresence exitBeforeEnter initial={false}>
          <SwapInputCardAnimateContainer
            downDirection={!isFlipped}
            key={keys[0]}
          >
            <SwapInputCard />
          </SwapInputCardAnimateContainer>
        </AnimatePresence>
      </SwapInputsContainer>
      <VaultInfo />
      <SwapButton>Swap</SwapButton>
    </Container>
  );
};
