import { generatePath, useHistory, useRouteMatch } from "react-router-dom";
import { useCallback } from "react";

import { SelectOptionButton } from "../../select-option-button/components";
import type { VaultModalRouteParameters } from "../../root/types";
import { ModalPathname } from "../../root/types";
import { useBasicVaults } from "../../basic-vault/hooks";
import { strikePricesGroups } from "../../long-option-modal/constants";

// import { longTradeVaults } from "../../basic/constants";

import { Title } from "./OptionSelect.styles";

export const OptionSelect = () => {
  const routerHistory = useHistory();
  const longTradeVaultModalUrlMatch = useRouteMatch<VaultModalRouteParameters>(
    ModalPathname.longTradeVaultModal
  );

  // const longVaultIdsByType = typeGroups.map((group) => group[VaultType.CALL]);
  // const longVaultIdsByStrikePrice = strikePricesGroups.map((group) => group[0]);
  const maticVaultId = "L-TN-CSCCv1-MATICUSD-A";
  const bnbVaultId = "L-TN-CSCCv1-BNBUSD";
  const longVaultIds = [maticVaultId, bnbVaultId];

  const longVaultQueries = useBasicVaults(longVaultIds);
  const longVaultsData = longVaultQueries.map(({ data }) => data);

  const selectedVaultId = longTradeVaultModalUrlMatch?.params.vaultId ?? "";

  // const longVaultsWithoutSelectedVaultId = longVaultsData.filter(
  //   (data) => data?.id !== selectedVaultId
  // );

  const maticVaultData =
    longVaultsData.find((data) => data?.id === maticVaultId) ?? null;
  const bnbVaultData =
    longVaultsData.find((data) => data?.id === bnbVaultId) ?? null;

  const longVaultsWithoutSelectedVaultId = strikePricesGroups[0].includes(
    selectedVaultId
  )
    ? [bnbVaultData]
    : [maticVaultData];

  // const selectedVault =
  //   longVaultsData.find((data) => {
  //     data?.id && data.id === selectedVaultId;
  //   }) ?? null;

  const selectedVault = strikePricesGroups[0].includes(selectedVaultId)
    ? maticVaultData
    : bnbVaultData;

  const buttonSymbol = selectedVault?.assetSymbol;
  const buttonTitle = selectedVault?.assetSymbol;
  const buttonColor = "#FFFFFF";

  const options = longVaultsWithoutSelectedVaultId.map((data) => ({
    id: data?.id ?? "",
    title: data?.assetSymbol,
    symbol: data?.assetSymbol,
  }));

  const optionClickHandler = useCallback(
    (id: string) => {
      const pathname = generatePath(ModalPathname.longTradeVaultModal, {
        vaultId: id,
      });

      routerHistory.push({ pathname });
    },
    [routerHistory]
  );

  const isLoading =
    longVaultQueries.some((query) => query.isLoading) || !selectedVault;

  if (isLoading) {
    return <Title>.....</Title>;
  }

  return (
    <SelectOptionButton
      color={buttonColor}
      onOptionClick={optionClickHandler}
      options={options}
      symbol={buttonSymbol}
      title={buttonTitle}
    />
  );
};
