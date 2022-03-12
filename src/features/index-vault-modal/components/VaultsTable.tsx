import { useSwapRouterConfig } from "../hooks";
import { VaultType } from "../../vault/constants";
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
  strikePrice: Vault["strikePrice"]
) => {
  const formattedStrikePrice = strikePrice
    ? currencyFormatterWithoutDecimals.format(strikePrice)
    : "";
  const formattedType = type === VaultType.CALL ? "Call" : "Put";
  return `${assetSymbol} ${formattedStrikePrice} ${formattedType}`;
};

const getVaultSubTitle = (
  expiry: Vault["expiry"],
  isSettled: Vault["isSettled"],
  isExpired: Vault["isExpired"]
) => {
  if (isSettled) {
    return "Settled";
  }

  if (isExpired) {
    return "Expired";
  }

  return dateFormatter.format(new Date(expiry));
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
            <HeaderCellValue>Portfolio</HeaderCellValue>
          </HeaderCell>
          <HeaderCell>
            <HeaderCellValue>APY %</HeaderCellValue>
          </HeaderCell>
          <HeaderCell>
            <HeaderCellValue>Allocation</HeaderCellValue>
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
                    {getVaultTitle(type, assetSymbol, strikePrice)}
                  </CellValue>
                  <CellSubValue>
                    {getVaultSubTitle(expiry, isSettled, isExpired)}
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
