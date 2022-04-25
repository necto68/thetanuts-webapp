import {
  Table,
  APYCellContainer,
  GreenCellValue,
  Chains,
  SwapButton,
  DemoButton,
  AssetCell,
} from "../../table/components";
import type { Column } from "../../table/types";
import { useIndexVaults } from "../../index-vault/hooks";
import type { IndexVault } from "../../index-vault/types";
import { demoIndexVaults, indexVaults } from "../constants";
import { currencyFormatterWithoutDecimals } from "../../shared/helpers";
import { InfoIcon, Tooltip } from "../../shared/components";
import { chainsMap } from "../../wallet/constants";
import type { DemoIndexVaultConfig } from "../types";

import { PercentageYieldsTooltip } from "./PercentageYieldsTooltip";

type IndexVaultRow = DemoIndexVaultConfig | IndexVault;

const columns: Column<IndexVaultRow>[] = [
  {
    key: "assetSymbol",
    title: "Asset",
    render: ({ assetSymbol }) => <AssetCell assetSymbol={assetSymbol} />,
    filterBy: true,
  },
  {
    key: "totalPercentageYields",
    title: "APY",
    showTitleInCell: true,

    render: ({ id, totalPercentageYields }) => (
      <APYCellContainer>
        <GreenCellValue>{`${totalPercentageYields.annualPercentageYield}%`}</GreenCellValue>
        <Tooltip
          content={
            <PercentageYieldsTooltip percentageYields={totalPercentageYields} />
          }
          id={id}
          root={<InfoIcon theme="light" />}
        />
      </APYCellContainer>
    ),
  },
  {
    key: "totalValueLocked",
    title: "TVL",
    showTitleInCell: true,

    render: (row) => {
      if ("isDemo" in row) {
        return "-";
      }

      return currencyFormatterWithoutDecimals.format(row.totalValueLocked);
    },
  },
  {
    key: "supportedChainIds",
    title: "Networks",

    render: (row) => {
      if ("isDemo" in row) {
        return "-";
      }

      const chains = row.supportedChainIds.map((chainId, index) => ({
        chainId,
        isHighlighted: index === 0,
      }));

      return <Chains chains={chains} />;
    },

    sortBy: ({ supportedChainIds }) => supportedChainIds.length,

    filterBy: ({ supportedChainIds }) =>
      supportedChainIds.map((chain) => chainsMap[chain].title),
  },
  {
    key: "id",

    render: (row) => {
      if ("isDemo" in row) {
        return <DemoButton />;
      }

      return <SwapButton indexVaultId={row.id} />;
    },
  },
];

const getRowKey = ({ id }: IndexVaultRow) => id;

export const IndexVaultsTable = () => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);
  const indexVaultsQueries = useIndexVaults(indexVaultsIds);

  const indexVaultsRows = indexVaultsQueries.map(({ data }) => data);
  const demoIndexVaultsRows = demoIndexVaults;
  // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
  const rows: (IndexVaultRow | undefined)[] = [
    ...indexVaultsRows,
    ...demoIndexVaultsRows,
  ];

  return (
    <Table
      columns={columns}
      filterInputPlaceholder="Filter by asset or network"
      getRowKey={getRowKey}
      rows={rows}
    />
  );
};
