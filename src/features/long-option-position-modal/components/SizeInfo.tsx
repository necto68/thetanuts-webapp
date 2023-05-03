import Big from "big.js";

import {
  useBasicModalConfig,
  useBasicModalState,
} from "../../basic-vault-modal/hooks";
import {
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../long-option-modal/components/OrderInfo.styles";
import { assetFormatter, numberFormatter } from "../../shared/helpers";
import { getLongVaultContractsTitle } from "../../table/helpers";
import { VaultType } from "../../basic-vault/types";
import { useLongModalConfig } from "../../long-vault-modal/hooks";

export const SizeInfo = () => {
  const { inputValue } = useBasicModalState();
  const { basicVaultQuery } = useBasicModalConfig();
  const { longVaultReaderQuery } = useLongModalConfig();

  const { data: basicVaultData } = basicVaultQuery;
  const { data: longVaultReaderData } = longVaultReaderQuery;

  const {
    type = VaultType.CALL,
    assetSymbol = "",
    collateralSymbol = "",
    valuePerLP = new Big(0),
  } = basicVaultData ?? {};

  const { currentContractsPosition = null } = longVaultReaderData ?? {};

  const loadingPlaceholder = ".....";

  if (!currentContractsPosition) {
    return (
      <InfoContainer>
        <InfoTitle>Size</InfoTitle>
        <InfoValue>{loadingPlaceholder}</InfoValue>
      </InfoContainer>
    );
  }

  const contractsTitle = getLongVaultContractsTitle(
    type,
    assetSymbol,
    collateralSymbol
  );

  const withdrawAmount = new Big(inputValue || 0);
  const withdrawContracts = withdrawAmount.mul(valuePerLP);

  const formattedContractsPosition = `${numberFormatter.format(
    currentContractsPosition.toNumber()
  )} ${contractsTitle}`;

  const finalAmount = currentContractsPosition.sub(withdrawContracts);

  const formattedFinalAmount = `${assetFormatter.format(
    finalAmount.toNumber()
  )} ${contractsTitle}`;

  return (
    <InfoContainer>
      <InfoTitle>Size</InfoTitle>
      <InfoValue>{`${formattedContractsPosition} → ${formattedFinalAmount}`}</InfoValue>
    </InfoContainer>
  );
};
