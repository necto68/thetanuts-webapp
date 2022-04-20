import type { ChangeEvent } from "react";
import { useCallback } from "react";
import Big from "big.js";

import { IconContainer, Tooltip } from "../../shared/components";
import { useSwapRouterState } from "../hooks";
import { Warning } from "../icons";

import {
  Container,
  InputContainer,
  Input,
  Title,
} from "./SlippageTolerance.styles";

export const SlippageTolerance = () => {
  const {
    slippageToleranceValue,
    slippageToleranceInputValue,
    setSlippageToleranceInputValue,
  } = useSwapRouterState();

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSlippageToleranceInputValue(event.target.value);
    },
    [setSlippageToleranceInputValue]
  );

  const slippageTolerance = new Big(slippageToleranceValue);
  const isError = slippageTolerance.lt(0.1) || slippageTolerance.gt(1);

  return (
    <Container>
      {isError ? (
        <Tooltip
          content="Slippage Tolerance should be between 0.1% and 1%"
          id="slippageTolerance"
          place="top"
          root={
            <IconContainer height={14} width={16}>
              <Warning />
            </IconContainer>
          }
        />
      ) : null}
      <InputContainer>
        <Input
          isError={isError}
          onChange={handleInputChange}
          value={slippageToleranceInputValue}
        />
        <Title>%</Title>
      </InputContainer>
    </Container>
  );
};
