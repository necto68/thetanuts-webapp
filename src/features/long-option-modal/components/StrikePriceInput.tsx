import { getFormattedStrikePrices } from "../../basic-vault-modal/helpers";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { VaultStatus } from "../../basic-vault-modal/types";
import { VaultType } from "../../basic-vault/types";
import { getVaultStatus } from "../../degen-vault-modal/helpers/utils";
import { strikePricesGroups } from "../constants";

import {
  Container,
  Title,
  InputContainer,
  InputValue,
} from "./CollateralInput.styles";
import { StrikePriceSelect } from "./StrikePriceSelect";

export const StrikePriceInput = () => {
  const { basicVaultQuery } = useBasicModalConfig();

  const { data, isLoading } = basicVaultQuery;

  const {
    id = "",
    type = VaultType.CALL,
    strikePrices = [0],
    isSettled = false,
    isExpired = false,
    isAllowInteractions = false,
  } = data ?? {};

  const vaultStatus = getVaultStatus(isSettled, isExpired, isAllowInteractions);

  const strikePrice =
    vaultStatus === VaultStatus.ACTIVE_EPOCH
      ? getFormattedStrikePrices(type, strikePrices.slice(0, 2))
      : "-";

  const loadingPlaceholder = ".....";

  const isShowStrikePriceSelect = strikePricesGroups.some((group) =>
    group.includes(id)
  );

  return (
    <Container>
      <Title>Strike Price</Title>
      {isShowStrikePriceSelect ? (
        <StrikePriceSelect />
      ) : (
        <InputContainer>
          <InputValue>
            {isLoading ? loadingPlaceholder : strikePrice}
          </InputValue>
        </InputContainer>
      )}
    </Container>
  );
};
