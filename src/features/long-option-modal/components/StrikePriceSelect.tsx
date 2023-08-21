import { generatePath, useHistory } from "react-router-dom";
import { useCallback } from "react";

import { SelectOptionButton } from "../../select-option-button/components";
import { ModalPathname } from "../../root/types";
import { useBasicVaults } from "../../basic-vault/hooks";
import { strikePricesGroups } from "../constants";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { getVaultStatus } from "../../degen-vault-modal/helpers/utils";
import { VaultStatus } from "../../basic-vault-modal/types";
import { getFormattedStrikePrices } from "../../basic-vault-modal/helpers";
import { VaultType } from "../../basic-vault/types";

import { InputContainer, InputValue } from "./CollateralInput.styles";

export const StrikePriceSelect = () => {
  const routerHistory = useHistory();
  const { basicVaultQuery } = useBasicModalConfig();

  const { data: basicVaultData } = basicVaultQuery;
  const {
    id = "",
    type = VaultType.CALL,
    strikePrices = [0],
    isSettled = false,
    isExpired = false,
    isAllowInteractions = false,
  } = basicVaultData ?? {};

  const longVaultIds =
    strikePricesGroups.find((group) => group.includes(id)) ?? [];
  const longVaultQueries = useBasicVaults(longVaultIds);
  const longVaultsData = longVaultQueries.map(({ data }) => data);

  const longVaultsWithoutSelectedVaultId = longVaultsData.filter(
    (data) => data?.id !== id
  );

  const selectedVault =
    longVaultsData.find((data) => data?.id && data.id === id) ?? null;

  const selectedVaultStatus = getVaultStatus(
    isSettled,
    isExpired,
    isAllowInteractions
  );

  const selectedStrikePrice =
    selectedVaultStatus === VaultStatus.ACTIVE_EPOCH
      ? getFormattedStrikePrices(type, strikePrices.slice(0, 2))
      : "-";

  const buttonTitle = selectedStrikePrice;
  const buttonColor = "#FFFFFF";

  const options = longVaultsWithoutSelectedVaultId.map((data) => {
    if (!data) {
      return {
        id: "",
        title: "-",
      };
    }

    const vaultStatus = getVaultStatus(
      data.isSettled,
      data.isExpired,
      data.isAllowInteractions
    );

    const strikePrice =
      vaultStatus === VaultStatus.ACTIVE_EPOCH
        ? getFormattedStrikePrices(data.type, data.strikePrices.slice(0, 2))
        : "-";

    return {
      id: data.id,
      title: strikePrice,
    };
  });

  const optionClickHandler = useCallback(
    (vaultId: string) => {
      const pathname = generatePath(ModalPathname.longTradeVaultModal, {
        vaultId,
      });

      routerHistory.push({ pathname });
    },
    [routerHistory]
  );

  const isLoading =
    longVaultQueries.some((query) => query.isLoading) || !selectedVault;

  const loadingPlaceholder = ".....";

  if (isLoading) {
    return (
      <InputContainer>
        <InputValue>{loadingPlaceholder}</InputValue>
      </InputContainer>
    );
  }

  return (
    <SelectOptionButton
      color={buttonColor}
      onOptionClick={optionClickHandler}
      options={options}
      title={buttonTitle}
    />
  );
};
