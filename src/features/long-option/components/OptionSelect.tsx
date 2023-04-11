import { generatePath, useHistory, useRouteMatch } from "react-router-dom";
import { useCallback } from "react";

import { SelectOptionButton } from "../../select-option-button/components";
import { longCallVaults, longPutVaults } from "../../basic/constants";
import type { VaultModalRouteParameters } from "../../root/types";
import { ModalPathname } from "../../root/types";
import { useBasicVaults } from "../../basic-vault/hooks";

import { Title } from "./OptionSelect.styles";

export const OptionSelect = () => {
  const routerHistory = useHistory();
  const longCallVaultModalUrlMatch = useRouteMatch<VaultModalRouteParameters>(
    ModalPathname.longCallVaultModal
  );
  const longPutVaultModalUrlMatch = useRouteMatch<VaultModalRouteParameters>(
    ModalPathname.longPutVaultModal
  );

  const isLongCallPage =
    longCallVaultModalUrlMatch && !longPutVaultModalUrlMatch;

  const modalPathname = isLongCallPage
    ? ModalPathname.longCallVaultModal
    : ModalPathname.longPutVaultModal;

  const longVaults = isLongCallPage ? longCallVaults : longPutVaults;
  const longVaultIds = longVaults.map(({ id }) => id);
  const longVaultQueries = useBasicVaults(longVaultIds);
  const longVaultsData = longVaultQueries.map(({ data }) => data);

  const urlMatch = isLongCallPage
    ? longCallVaultModalUrlMatch
    : longPutVaultModalUrlMatch;

  const selectedVaultId = urlMatch?.params.vaultId;

  const longVaultsWithoutSelectedVaultId = longVaultsData.filter(
    (data) => data?.id !== selectedVaultId
  );

  const selectedVault =
    longVaultsData.find((data) => data?.id && data.id === selectedVaultId) ??
    null;

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
      const pathname = generatePath(modalPathname, {
        vaultId: id,
      });

      routerHistory.push({ pathname });
    },
    [routerHistory, modalPathname]
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
