import { useEffect } from "react";
import Big from "big.js";

import { useVaultModalState } from "../../modal/hooks";
import {
  useBasicModalConfig,
  useBasicModalState,
} from "../../basic-vault-modal/hooks";
import { numberFormatter } from "../../shared/helpers";
import { useLongOptionModalConfig } from "../../long-option-modal/hooks";
import { getLongVaultContractsTitle } from "../../table/helpers";
import { VaultType } from "../../basic-vault/types";
import { Separator } from "../../long-option-modal/components/LongOptionModal.styles";

import { Container, Title, ToTitle } from "./PositionInfo.styles";

export const PositionInfo = () => {
  const [{ defaultInputValue }] = useVaultModalState();
  const { inputValue, setInputValue } = useBasicModalState();
  const { basicVaultQuery } = useBasicModalConfig();
  const { longOptionReaderQuery } = useLongOptionModalConfig();

  const { data: basicVaultData } = basicVaultQuery;
  const { data: longOptionReaderData } = longOptionReaderQuery;

  const {
    type = VaultType.CALL,
    assetSymbol = "",
    collateralSymbol = "",
  } = basicVaultData ?? {};
  const { contractsToBorrow = new Big(0) } = longOptionReaderData ?? {};

  useEffect(() => {
    if (defaultInputValue) {
      // TODO: remove timeout hack later

      setTimeout(() => {
        setInputValue(defaultInputValue);
      }, 100);
    }
  }, [defaultInputValue, setInputValue]);
  const inputValueBig = new Big(inputValue || 0);

  const sourceTokenData = {
    value: numberFormatter.format(inputValueBig.toNumber()),
    symbol: collateralSymbol,
  };

  const targetTokenData = {
    value: contractsToBorrow
      ? numberFormatter.format(contractsToBorrow.toNumber())
      : 0,

    symbol: getLongVaultContractsTitle(type, assetSymbol, collateralSymbol),
  };

  return (
    <Container>
      <Title>{`Pay ${sourceTokenData.value} ${sourceTokenData.symbol}`}</Title>
      <ToTitle>↓</ToTitle>
      <Title>{`Bid ${targetTokenData.value} ${targetTokenData.symbol}`}</Title>
      <Separator />
    </Container>
  );
};
