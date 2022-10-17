import { useSwapRouterConfig } from "../hooks";
import type { IndexVault } from "../../index-vault/types";
import { ExternalLinkButton } from "../../shared/components";
import {
  dateFormatter,
  periodFormatter,
  strikePriceFormatter,
} from "../../shared/helpers";
import { PathType } from "../../wallet/types";
import type { BasicVault } from "../../basic-vault/types";
import { VaultType } from "../../basic-vault/types";
import { getBasicVaultStatusTitle } from "../../basic-vault/helpers";

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
  assetSymbol: BasicVault["assetSymbol"],
  period: BasicVault["period"]
) => {
  const formattedPeriod = periodFormatter(period);
  const formattedType = type === VaultType.CALL ? "Call" : "Put";

  return `${formattedPeriod} ${assetSymbol} ${formattedType}`;
};

export const getVaultSubTitle = (
  strikePrices: BasicVault["strikePrices"],
  expiry: BasicVault["expiry"],
  isSettled: BasicVault["isSettled"],
  isExpired: BasicVault["isExpired"],
  isAllowInteractions: BasicVault["isAllowInteractions"]
) => {
  const basicVaultStatusTitle = getBasicVaultStatusTitle(
    isSettled,
    isExpired,
    isAllowInteractions
  );

  if (basicVaultStatusTitle) {
    return <ClaimStatusText>{basicVaultStatusTitle}</ClaimStatusText>;
  }

  const formattedStrikePrice = strikePriceFormatter(strikePrices[0]);

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
              strikePrices,
              expiry,
              period,
              annualPercentageYield,
              isSettled,
              isExpired,
              isAllowInteractions,
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
                      strikePrices,
                      expiry,
                      isSettled,
                      isExpired,
                      isAllowInteractions
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
