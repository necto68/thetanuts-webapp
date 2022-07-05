import { useSwapRouterConfig, useWithdrawDataQuery } from "../hooks";
import { VaultType } from "../../index-vault/types";
import { ExternalLinkButton, InfoIcon, Tooltip } from "../../shared/components";
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
import { getVaultSubTitle, getVaultTitle } from "./VaultsTable";

export const VaultsWithdrawScheduleTable = () => {
  const { indexVaultQuery } = useSwapRouterConfig();
  const { data: withdrawData } = useWithdrawDataQuery();
  const {
    vaultsClaimed = {},
    vaultsExpected = {},
    vaultsClaimable = {},
    vaultsPending = {},
  } = withdrawData ?? {};

  const { isLoading, data } = indexVaultQuery;
  const {
    type = VaultType.CALL,
    assetSymbol: indexAssetSymbol = "",
    chainId = 1,
    vaults = [],
  } = data ?? {};

  const getVaultPosition = (vaultAddress: string) => {
    if (vaultsClaimable[vaultAddress]) {
      return (
        <ClaimStatusText>
          Settled
          <Tooltip
            content="If the option has not expired, the status would should
in-progress. After the option has expired, it would show
if any losses have been incurred"
            id={`${vaultAddress}-settled-hint`}
            place="top"
            root={<InfoIcon />}
          />
        </ClaimStatusText>
      );
    }

    if (
      vaultsPending[vaultAddress] ||
      (!vaultsExpected[vaultAddress] && !vaultsClaimed[vaultAddress])
    ) {
      return (
        <ClaimStatusText>
          In-Progress
          <Tooltip
            content="If the option has not expired, the status would should
in-progress. After the option has expired, it would show
if any losses have been incurred"
            id={vaultAddress}
            place="top"
            root={<InfoIcon />}
          />
        </ClaimStatusText>
      );
    }

    const withdrawLose = Number(
      Number(vaultsExpected[vaultAddress] ?? 0) -
        Number(vaultsClaimed[vaultAddress] ?? 0)
    ).toFixed(2);

    return (
      <ClaimStatusText>
        -{withdrawLose} {indexAssetSymbol}
        <Tooltip
          content="If the option has not expired, the status would should
in-progress. After the option has expired, it would show
if any losses have been incurred"
          id={`${vaultAddress}-expected-difference-hint`}
          place="top"
          root={<InfoIcon />}
        />
      </ClaimStatusText>
    );
  };

  const getVaultWithdrawAmount = (vaultAddress: string): string | undefined =>
    `${vaultsExpected[vaultAddress] ?? 0} ${indexAssetSymbol}`;

  const getCurrentVaultPosition = (vaultAddress: string) => {
    const value = vaultsClaimable[vaultAddress] ?? vaultsClaimed[vaultAddress];
    return value ? `${value} ${indexAssetSymbol}` : undefined;
  };

  const getVaultStatusText = (vaultAddress: string) => {
    if (vaultsClaimable[vaultAddress]) {
      return (
        <ClaimStatusText>
          Claimable
          <Tooltip
            content="The claimable amount refers to the withdraw amount
minus any losses incurred once the option has expired.
Once the user has claimed the amount, the status would
change to “claimed”"
            id={`${vaultAddress}-claimable-hint`}
            place="top"
            root={<InfoIcon />}
          />
        </ClaimStatusText>
      );
    }

    if (vaultsClaimed[vaultAddress]) {
      return <ClaimStatusText>Claimed</ClaimStatusText>;
    }

    return <ClaimStatusText>-</ClaimStatusText>;
  };

  return (
    <TableContainer>
      <thead>
        <HeaderRow>
          <HeaderCell>
            <HeaderCellValue>Individual Options</HeaderCellValue>
          </HeaderCell>
          <HeaderCell>
            <HeaderCellValue>
              Withdraw&nbsp;
              <Tooltip
                content="Shows the withdraw amount in each of the respective
individual option vault(s) given that the option is not ITM"
                id="vaultWithdrawAmountHint"
                place="top"
                root={<InfoIcon />}
              />
            </HeaderCellValue>
          </HeaderCell>
          <HeaderCell>
            <HeaderCellValue>Claim</HeaderCellValue>
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
          ({
            vaultAddress,
            assetSymbol,
            strikePrice,
            expiry,
            period,
            isSettled,
            isExpired,
          }) => (
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
                  {getVaultWithdrawAmount(vaultAddress) ?? "-"}
                </CellValue>
                <CellValue>{getVaultPosition(vaultAddress)}</CellValue>
              </td>
              <td>
                {vaultsClaimed[vaultAddress] || vaultsExpected[vaultAddress] ? (
                  <CellValue>{getCurrentVaultPosition(vaultAddress)}</CellValue>
                ) : (
                  ""
                )}
                <CellSubValue>{getVaultStatusText(vaultAddress)}</CellSubValue>
              </td>
              <td>
                <CellValueCenter>
                  <ExternalLinkButton
                    chainId={chainId}
                    id={vaultAddress}
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
