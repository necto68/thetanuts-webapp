import { useSwapRouterConfig, useWithdrawDataQuery } from "../hooks";
import { VaultType } from "../../basic-vault/types";
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
    staticCalculation = true,
    vaultsClaimed = {},
    vaultsExpected = {},
    vaultsClaimable = {},
    vaultsPending = {},
    withdrawnVaults = [],
  } = withdrawData ?? {};

  const { isLoading, data } = indexVaultQuery;
  const {
    type = VaultType.CALL,
    assetSymbol: indexAssetSymbol = "",
    chainId = 1,
    vaults: basicVaults = [],
  } = data ?? {};

  const vaults = staticCalculation
    ? basicVaults
    : basicVaults.filter(({ basicVaultAddress }) =>
        Boolean(vaultsExpected[basicVaultAddress])
      );

  const getWithdrawnLose = (
    expected: string,
    claimed: string,
    uniqKey: string
  ) => {
    const withdrawLose = Number(Number(expected) - Number(claimed)).toFixed(2);

    return (
      <ClaimStatusText>
        -{withdrawLose} {indexAssetSymbol}
        <Tooltip
          content="If the option has not expired, the status would should
in-progress. After the option has expired, it would show
if any losses have been incurred"
          id={`${uniqKey}-expected-difference-hint`}
          place="top"
          root={<InfoIcon />}
        />
      </ClaimStatusText>
    );
  };

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

    return getWithdrawnLose(
      vaultsExpected[vaultAddress] ?? "0",
      vaultsClaimed[vaultAddress] ?? "0",
      vaultAddress
    );
  };

  const getVaultTitleByAddress = (address: string): string => {
    const { assetSymbol = "", period = 0 } =
      basicVaults.find(
        ({ basicVaultAddress }) => basicVaultAddress === address
      ) ?? {};
    return getVaultTitle(type, assetSymbol, period);
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
            basicVaultAddress,
            assetSymbol,
            strikePrice,
            expiry,
            period,
            isSettled,
            isExpired,
          }) => (
            <tr key={basicVaultAddress}>
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
                  {getVaultWithdrawAmount(basicVaultAddress) ?? "-"}
                </CellValue>
                <CellValue>{getVaultPosition(basicVaultAddress)}</CellValue>
              </td>
              <td>
                {vaultsClaimed[basicVaultAddress] ||
                vaultsExpected[basicVaultAddress] ? (
                  <CellValue>
                    {getCurrentVaultPosition(basicVaultAddress)}
                  </CellValue>
                ) : (
                  ""
                )}
                <CellSubValue>
                  {getVaultStatusText(basicVaultAddress)}
                </CellSubValue>
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
        {withdrawnVaults.map(
          ({ vaultAddress, strikePrice, expiry, expected, claimed }, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={`${vaultAddress}${index}`}>
              <td>
                <PortfolioCellContainer>
                  <CellValue>{getVaultTitleByAddress(vaultAddress)}</CellValue>
                  <CellSubValue>
                    {getVaultSubTitle(strikePrice, expiry, false, false)}
                  </CellSubValue>
                </PortfolioCellContainer>
              </td>
              <td>
                <CellValue>
                  {expected} {indexAssetSymbol}
                </CellValue>
                <CellValue>
                  {getWithdrawnLose(
                    expected,
                    claimed,
                    `${vaultAddress}${index}`
                  )}
                </CellValue>
              </td>
              <td>
                <CellValue>
                  {claimed} {indexAssetSymbol}
                </CellValue>
                <CellSubValue>Claimed</CellSubValue>
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
