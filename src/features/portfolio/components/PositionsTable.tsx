import type { Column } from "../../table/types";
import {
  Table,
  GreenCellValue,
  Chains,
  VaultModalButton,
  ClaimButton,
  CellValue,
  AssetCell,
} from "../../table/components";
import type { IndexTokenRow } from "../types";
import { useIndexPositionsRows } from "../hooks";
import { currencyFormatter, numberFormatter } from "../../shared/helpers";
import { chainsMap } from "../../wallet/constants";
import { VaultModalType } from "../../root/types";

import { ButtonsContainer } from "./PositionsTableActions.styles";

const columns: Column<IndexTokenRow>[] = [
  {
    key: "assetSymbol",
    title: "Asset",
    render: ({ assetSymbol }) => <AssetCell assetSymbol={assetSymbol} />,
    filterBy: true,
  },
  {
    key: "productType",
    title: "Product",
    showTitleInCell: true,
    render: () => "Stronghold",
    filterBy: true,
  },
  {
    key: "annualPercentageYield",
    title: "APY",
    showTitleInCell: true,

    render: ({ annualPercentageYield }) => (
      <GreenCellValue>{`${annualPercentageYield}%`}</GreenCellValue>
    ),
  },
  {
    key: "balance",
    title: "Balance",
    showTitleInCell: true,

    render: ({ symbol, balance }) =>
      balance ? `${numberFormatter.format(balance.toNumber())}  ${symbol}` : "",

    sortBy: ({ balance }) => (balance ? balance.toNumber() : 0),
  },
  {
    key: "middleIndexPrice",
    title: "Value",
    showTitleInCell: true,

    render: ({ balance, middleIndexPrice }) => {
      if (!balance) {
        return "";
      }

      const price = balance.mul(middleIndexPrice).round(2).toNumber();

      return currencyFormatter.format(price);
    },

    sortBy: ({ balance, middleIndexPrice }) =>
      balance ? balance.mul(middleIndexPrice).toNumber() : 0,
  },
  {
    key: "chainId",
    title: "Network",

    // TODO: change modalPathname for different vault types (index/basic)
    render: ({ id, chainId }) => (
      <Chains
        chainIds={[chainId]}
        vaultId={id}
        vaultType={VaultModalType.index}
      />
    ),

    filterBy: ({ chainId }) => chainsMap[chainId].title,
  },
  {
    key: "id",

    // TODO: change vaultType for different vault types (index/basic)
    render: ({ id, chainId, unclaimed, withdrawId }) => (
      <ButtonsContainer>
        {unclaimed ? (
          <ClaimButton
            chainId={chainId}
            indexVaultId={id}
            withdrawId={withdrawId}
          />
        ) : null}
        <VaultModalButton
          chainId={chainId}
          vaultId={id}
          vaultType={VaultModalType.index}
        >
          Swap
        </VaultModalButton>
      </ButtonsContainer>
    ),
  },
];

const getRowKey = ({ tokenAddress, chainId }: IndexTokenRow) =>
  `${tokenAddress}${chainId}`;

export const PositionsTable = () => {
  const indexPositionsRows = useIndexPositionsRows();

  const filteredRows = indexPositionsRows.filter((row) =>
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    row ? row.balance?.gt(0) || row.unclaimed : true
  );

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
