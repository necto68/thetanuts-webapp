import { useSwapRouterConfig } from "../hooks";
import { VaultType } from "../../index-vault/types";
import type { IndexVault, Vault } from "../../index-vault/types";
import { ExternalLinkButton } from "../../shared/components";
import {
  currencyFormatterWithoutDecimals,
  dateFormatter,
} from "../../shared/helpers";
import { PathType } from "../../wallet/types";

import {
  CellSubValue,
  CellValue,
  HeaderCell,
  HeaderCellValue,
  HeaderRow,
  PortfolioCellContainer,
  TableContainer,
} from "./VaultsTable.styles";

const getVaultTitle = (
  type: IndexVault["type"],
  assetSymbol: Vault["assetSymbol"],
  period: Vault["period"]
) => {
  const mapPeriodToTitle = new Map([
    [7, "Weekly"],
    [14, "Bi-Weekly"],
    [30, "Monthly"],
  ]);
  const secondsInDay = 60 * 60 * 24;
  const daysInPeriod = Math.floor(period / secondsInDay);

  const formattedPeriod =
    mapPeriodToTitle.get(daysInPeriod) ?? `${daysInPeriod}-Day`;

  const formattedType = type === VaultType.CALL ? "Call" : "Put";

  return `${formattedPeriod} ${assetSymbol} ${formattedType}`;
};

const getVaultSubTitle = (
  strikePrice: Vault["strikePrice"],
  expiry: Vault["expiry"],
  isSettled: Vault["isSettled"],
  isExpired: Vault["isExpired"]
) => {
  if (isSettled || isExpired) {
    return "Auction In Progress";
  }

  const formattedStrikePrice = strikePrice
    ? currencyFormatterWithoutDecimals.format(strikePrice)
    : "";

  const formattedExpiryDate = dateFormatter.format(new Date(expiry));

  return `${formattedStrikePrice} ${formattedExpiryDate}`;
};

export const VaultsTable = () => {
  const { indexVaultQuery } = useSwapRouterConfig();
  const { isLoading, data } = indexVaultQuery;
  const {
    type = VaultType.CALL,
    chainId = 1,
    vaults = [],
    vaultsInfos = [],
  } = data ?? {};

  return (
    <TableContainer>
      <thead>
        <HeaderRow>
          <HeaderCell>
            <HeaderCellValue>Individual Options</HeaderCellValue>
          </HeaderCell>
          <HeaderCell>
            <HeaderCellValue>APY %</HeaderCellValue>
          </HeaderCell>
          <HeaderCell>
            <HeaderCellValue>Weight</HeaderCellValue>
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
              annualPercentageYield,
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
                <CellValue>{`${annualPercentageYield}%`}</CellValue>
              </td>
              <td>
                <CellValue>{`${vaultsInfos[index].allocation}%`}</CellValue>
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
