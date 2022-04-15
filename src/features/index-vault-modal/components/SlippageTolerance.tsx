import type { ChangeEvent } from "react";
import { useCallback } from "react";
import Big from "big.js";

import { Tooltip } from "../../shared/components";
import { useSwapRouterState } from "../hooks";

import { Container, Input, Title } from "./SlippageTolerance.styles";

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

  if (isError) {
    return (
      <Tooltip
        content="Slippage Tolerance should be between 0.1% and 1%"
        id="slippageTolerance"
        place="top"
        root={
          <Container>
            <Input
              isError
              onChange={handleInputChange}
              value={slippageToleranceInputValue}
            />
            <Title isError>%</Title>
          </Container>
        }
      />
    );
  }

  return (
    <Container>
      <Input onChange={handleInputChange} value={slippageToleranceInputValue} />
      <Title>%</Title>
    </Container>
  );
};
