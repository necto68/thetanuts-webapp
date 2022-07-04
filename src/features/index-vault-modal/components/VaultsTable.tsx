import { useSwapRouterConfig } from "../hooks";
import { VaultType } from "../../index-vault/types";
import type { IndexVault, Vault } from "../../index-vault/types";
import { ExternalLinkButton } from "../../shared/components";
import {
  currencyFormatter,
  currencyFormatterWithoutDecimals,
  dateFormatter,
  periodFormatter,
} from "../../shared/helpers";
import { PathType } from "../../wallet/types";

import {
  CellSubValue,
  CellValue,
  CellValueCenter,
  ClaimStatusText,
  HeaderCell,
  HeaderCellValue,
  HeaderCellValueCenter,
  HeaderRow,
  PortfolioCellContainer,
  TableContainer,
} from "./VaultsTable.styles";

export const getVaultTitle = (
  type: IndexVault["type"],
  assetSymbol: Vault["assetSymbol"],
  period: Vault["period"]
) => {
  const formattedPeriod = periodFormatter(period);
  const formattedType = type === VaultType.CALL ? "Call" : "Put";

  return `${formattedPeriod} ${assetSymbol} ${formattedType}`;
};

export const getVaultSubTitle = (
  strikePrice: Vault["strikePrice"],
  expiry: Vault["expiry"],
  isSettled: Vault["isSettled"],
  isExpired: Vault["isExpired"]
) => {
  if (isSettled || isExpired) {
    return <ClaimStatusText>Auction In Progress</ClaimStatusText>;
  }

  const strikePriceFormatter = Number.isInteger(strikePrice)
    ? currencyFormatterWithoutDecimals
    : currencyFormatter;

  const formattedStrikePrice = strikePrice
    ? strikePriceFormatter.format(strikePrice)
    : "";

  const formattedExpiryDate = dateFormatter.format(new Date(expiry));

  return (
    <ClaimStatusText>
      {formattedStrikePrice} {formattedExpiryDate}
    </ClaimStatusText>
  );
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
            <HeaderCellValueCenter>Contract</HeaderCellValueCenter>
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
              id,
              basicVaultAddress,
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
            <tr key={id}>
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
                <CellValue>{`${vaultsInfos[index].allocation.toFixed(
                  2
                )}%`}</CellValue>
              </td>
              <td>
                <CellValueCenter>
                  <ExternalLinkButton
                    chainId={chainId}
                    id={basicVaultAddress}
                    pathType={PathType.address}
                  />
                </CellValueCenter>
              </td>
            </tr>
          )
        )}
      </tbody>
    </TableContainer>
  );
};
