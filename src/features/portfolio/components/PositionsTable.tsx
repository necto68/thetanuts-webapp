import type { Column } from "../../table/types";
import {
  Table,
  GreenCellValue,
  Chains,
  ClaimButton,
  CellValue,
  AssetCell,
  SwapButton,
  DepositButton,
} from "../../table/components";
import type { IndexVaultRow, BasicVaultRow } from "../types";
import { useIndexPositionsRows, useBasicPositionsRows } from "../hooks";
import { currencyFormatter, highYieldFormatter } from "../../shared/helpers";
import { chainsMap } from "../../wallet/constants";
import { VaultModalType } from "../../root/types";
import { productTitlesMap } from "../../table/constants";
import { WithdrawButton } from "../../table/components/WithdrawButton";
import { getVaultTitle } from "../../table/helpers";
import { getVaultTypeStrategy } from "../../index-vault/helpers";

import { ButtonsContainer } from "./PositionsTableActions.styles";
import { PositionCell } from "./PositionCell";

type PositionTableRow = BasicVaultRow | IndexVaultRow;

const columns: Column<PositionTableRow>[] = [
  {
    key: "assetSymbol",
    title: "Product",

    render: ({ vaultType, type, assetSymbol, collateralSymbol }) => (
      <AssetCell
        assetSymbol={assetSymbol}
        collateralSymbol={collateralSymbol}
        type={type}
        vaultType={vaultType}
      />
    ),

    filterBy: ({ assetSymbol, collateralSymbol, vaultType, type }) => [
      assetSymbol,
      collateralSymbol,
      getVaultTitle(vaultType, type, assetSymbol, collateralSymbol),
      getVaultTypeStrategy(type),
    ],
  },
  {
    key: "vaultType",
    title: "Strategy",
    render: ({ vaultType }) => productTitlesMap[vaultType],
    filterBy: true,
  },
  {
    key: "annualPercentageYield",
    title: "APY",

    render: ({ annualPercentageYield }) => (
      <GreenCellValue>{`${highYieldFormatter(
        annualPercentageYield
      )}%`}</GreenCellValue>
    ),
  },
  {
    key: "currentPosition",
    title: "Position",

    tooltipTitle:
      '"Deposit Pending" users do not earn option premiums (yield) until the start of the next epoch. "Withdrawal Pending" users will continue to receive the option premiums (yield) or can cancel their withdrawal at any point before the end of the epoch.',

    render: (row) => {
      const { id, symbol, currentPosition } = row;

      const depositPending =
        "depositPending" in row ? row.depositPending : null;
      const withdrawalPending =
        "withdrawalPending" in row ? row.withdrawalPending : null;

      return (
        <PositionCell
          currentPosition={currentPosition}
          depositPending={depositPending}
          id={id}
          symbol={symbol}
          withdrawalPending={withdrawalPending}
        />
      );
    },

    sortBy: ({ currentPosition }) =>
      currentPosition ? currentPosition.toNumber() : 0,
  },
  {
    key: "assetPrice",
    title: "Value (USD)",

    render: ({ currentPosition, assetPrice }) => {
      if (!currentPosition) {
        return "";
      }

      const price = currentPosition.mul(assetPrice).round(2).toNumber();

      return currencyFormatter.format(price);
    },

    sortBy: ({ currentPosition, assetPrice }) =>
      currentPosition ? currentPosition.mul(assetPrice).toNumber() : 0,
  },
  {
    key: "chainId",
    title: "Network",

    render: ({ id, vaultType, chainId }) => (
      <Chains chainIds={[chainId]} vaultId={id} vaultType={vaultType} />
    ),

    filterBy: ({ chainId }) => chainsMap[chainId].title,
  },
  {
    key: "id",

    render: (row) => {
      const { id, vaultType, chainId } = row;

      if (vaultType === VaultModalType.index) {
        const unclaimed = "unclaimed" in row ? row.unclaimed : undefined;
        const withdrawId = "withdrawId" in row ? row.withdrawId : undefined;

        return (
          <ButtonsContainer>
            <SwapButton chainId={chainId} vaultId={id} />
            <ClaimButton
              chainId={chainId}
              disabled={!unclaimed}
              vaultId={id}
              withdrawId={withdrawId}
            />
          </ButtonsContainer>
        );
      }

      return (
        <ButtonsContainer>
          {/* <DepositButton chainId={chainId} vaultId={id} vaultType={vaultType} /> */}
          <WithdrawButton
            chainId={chainId}
            vaultId={id}
            vaultType={vaultType}
          />
        </ButtonsContainer>
      );
    },
  },
];

const getRowKey = ({ id, chainId }: IndexVaultRow) => `${id}${chainId}`;

export const PositionsTable = () => {
  const indexPositionsRows = useIndexPositionsRows();
  const basicPositionsRows = useBasicPositionsRows();

  const positionRows: (PositionTableRow | undefined)[] = [
    ...indexPositionsRows,
    ...basicPositionsRows,
  ];

  const filteredRows = positionRows.filter((row) => {
    if (!row) {
      return true;
    }

    if (
      row.currentPosition?.gt(0) ||
      ("depositPending" in row && row.depositPending?.gt(0)) ||
      ("withdrawalPending" in row && row.withdrawalPending?.gt(0))
    ) {
      return true;
    }

    if ("unclaimed" in row && row.unclaimed) {
      return true;
    }

    return false;
  });

  if (filteredRows.length === 0) {
    return <CellValue>You don&apos;t have any funds, yet</CellValue>;
  }

  return (
    <Table
      columns={columns}
      filterInputPlaceholder="Filter by Product, Strategy or Network"
      getRowKey={getRowKey}
      rows={filteredRows}
    />
  );
};
