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
import { currencyFormatter, numberFormatter } from "../../shared/helpers";
import { chainsMap } from "../../wallet/constants";
import { VaultModalType } from "../../root/types";
import { productTitlesMap } from "../../table/constants";

import { ButtonsContainer } from "./PositionsTableActions.styles";

type PositionTableRow = BasicVaultRow | IndexVaultRow;

const columns: Column<PositionTableRow>[] = [
  {
    key: "assetSymbol",
    title: "Vault",

    render: ({ vaultType, type, assetSymbol, collateralSymbol }) => (
      <AssetCell
        assetSymbol={assetSymbol}
        collateralSymbol={collateralSymbol}
        type={type}
        vaultType={vaultType}
      />
    ),

    filterBy: true,
  },
  {
    key: "vaultType",
    title: "Product",
    render: ({ vaultType }) => productTitlesMap[vaultType],
    filterBy: true,
  },
  {
    key: "annualPercentageYield",
    title: "APY",

    render: ({ annualPercentageYield }) => (
      <GreenCellValue>{`${annualPercentageYield}%`}</GreenCellValue>
    ),
  },
  {
    key: "balance",
    title: "Balance",

    render: ({ symbol, balance }) =>
      balance ? `${numberFormatter.format(balance.toNumber())} ${symbol}` : "",

    sortBy: ({ balance }) => (balance ? balance.toNumber() : 0),
  },
  {
    key: "assetPrice",
    title: "Value",

    render: ({ balance, assetPrice }) => {
      if (!balance) {
        return "";
      }

      const price = balance.mul(assetPrice).round(2).toNumber();

      return currencyFormatter.format(price);
    },

    sortBy: ({ balance, assetPrice }) =>
      balance ? balance.mul(assetPrice).toNumber() : 0,
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
    minWidth: 215,

    render: (row) => {
      const { id, vaultType, chainId } = row;

      if (vaultType === VaultModalType.index) {
        const unclaimed = "unclaimed" in row ? row.unclaimed : undefined;
        const withdrawId = "withdrawId" in row ? row.withdrawId : undefined;

        return (
          <ButtonsContainer>
            {unclaimed ? (
              <ClaimButton
                chainId={chainId}
                vaultId={id}
                withdrawId={withdrawId}
              />
            ) : null}
            <SwapButton chainId={chainId} vaultId={id} />
          </ButtonsContainer>
        );
      }

      return (
        <DepositButton chainId={chainId} vaultId={id} vaultType={vaultType} />
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

    if (row.balance?.gt(0)) {
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
      filterInputPlaceholder="Filter by asset, product or network"
      getRowKey={getRowKey}
      rows={filteredRows}
    />
  );
};
