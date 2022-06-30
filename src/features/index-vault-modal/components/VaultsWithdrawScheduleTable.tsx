import Big from "big.js";

import { useSwapRouterConfig, useSwapRouterState } from "../hooks";
import { VaultType } from "../../index-vault/types";
import type { Vault, VaultInfo } from "../../index-vault/types";
import { ExternalLinkButton } from "../../shared/components";
import { utcDateFormatter, utcTimeFormatter } from "../../shared/helpers";
import { PathType } from "../../wallet/types";
import { useWithdrawDataQuery } from "../hooks/useWithdrawDataQuery";

import {
  CellSubValue,
  CellValue,
  HeaderCell,
  HeaderCellValue,
  HeaderRow,
  PortfolioCellContainer,
  TableContainer,
} from "./VaultsTable.styles";
import { getVaultSubTitle, getVaultTitle } from "./VaultsTable";

const getVaultExpiry = (expiry: Vault["expiry"]) => {
  if (!expiry) {
    return "-";
  }

  const formattedExpiryTimeUTC = utcTimeFormatter.format(new Date(expiry));
  const formattedExpiryDateUTC = utcDateFormatter.format(new Date(expiry));

  return `${formattedExpiryTimeUTC} UTC ${formattedExpiryDateUTC}`;
};

export const VaultsWithdrawScheduleTable = () => {
  const { indexVaultQuery } = useSwapRouterConfig();
  const { sourceData } = useSwapRouterState();
  const { data: withdrawData } = useWithdrawDataQuery();
  const { vaultsClaimed = {}, vaultsExpected = {} } = withdrawData ?? {};

  const { isLoading, data } = indexVaultQuery;
  const {
    type = VaultType.CALL,
    assetSymbol: indexAssetSymbol = "",
    middleIndexPrice = 1,
    assetPrice = 1,
    chainId = 1,
    vaults = [],
    vaultsInfos = [],
  } = data ?? {};

  // Set exchange rate.
  const exchangeRate = new Big(middleIndexPrice).div(assetPrice).round(5);

  const getVaultPosition = (vaultsInfo: VaultInfo): string | undefined => {
    const value = sourceData?.balance
      ?.mul(exchangeRate)
      .mul(new Big(vaultsInfo.allocation).div(100))
      .toFixed(3);
    return `${value ?? 0} ${indexAssetSymbol}`;
  };

  const getCurrentVaultPosition = (vaultAddress: string): string => {
    const value = vaultsClaimed[vaultAddress] ?? vaultsExpected[vaultAddress];
    return value ? `${value} ${indexAssetSymbol}` : "-";
  };

  const getVaultStatusText = (
    vaultAddress: string,
    isExpired: boolean
  ): string => {
    if (vaultsClaimed[vaultAddress]) {
      return "Claimed";
    }

    return isExpired ? "Expired" : "Pending";
  };

  return (
    <TableContainer>
      <thead>
        <HeaderRow>
          <HeaderCell>
            <HeaderCellValue>Individual Options</HeaderCellValue>
          </HeaderCell>
          <HeaderCell>
            <HeaderCellValue>Schedule</HeaderCellValue>
          </HeaderCell>
          <HeaderCell>
            <HeaderCellValue>Status</HeaderCellValue>
          </HeaderCell>
          <HeaderCell>
            <HeaderCellValue>Tx</HeaderCellValue>
          </HeaderCell>
        </HeaderRow>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td>
              <PortfolioCellContainer>
                <CellValue>.....</CellValue>
                <CellSubValue>.....</CellSubValue>
              </PortfolioCellContainer>
            </td>
            <td>
              <CellValue>.....</CellValue>
            </td>
            <td>
              <CellValue>.....</CellValue>
            </td>
            <td>
              <CellValue>.....</CellValue>
            </td>
          </tr>
        ) : null}
        {vaults.map(
          (
            {
              vaultAddress,
              assetSymbol,
              strikePrice,
              expiry,
              period,
              isSettled,
              isExpired,
            },
            index
          ) => (
            <tr key={vaultAddress}>
              <td>
                <PortfolioCellContainer>
                  <CellValue>
                    {getVaultTitle(type, assetSymbol, period)}
                  </CellValue>
                  <CellSubValue>
                    {getVaultSubTitle(
                      strikePrice,
                      expiry,
                      isSettled,
                      isExpired
                    )}
                  </CellSubValue>
                </PortfolioCellContainer>
              </td>
              <td>
                <CellValue>
                  {getVaultPosition(vaultsInfos[index]) ?? "-"}
                </CellValue>
                <CellSubValue>{getVaultExpiry(expiry)}</CellSubValue>
              </td>
              <td>
                <CellValue>{getCurrentVaultPosition(vaultAddress)}</CellValue>
                <CellSubValue>
                  {getVaultStatusText(vaultAddress, isExpired)}
                </CellSubValue>
              </td>
              <td>
                <CellValue>
                  <ExternalLinkButton
                    chainId={chainId}
                    id={vaultAddress}
                    pathType={PathType.address}
                  />
                </CellValue>
              </td>
            </tr>
          )
        )}
      </tbody>
    </TableContainer>
  );
};
