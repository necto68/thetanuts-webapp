import {
  Table,
  APYCellContainer,
  Chains,
  DemoButton,
  AssetCell,
  SwapButton,
  CellValue,
} from "../../table/components";
import type { Column } from "../../table/types";
import { useIndexVaults } from "../../index-vault/hooks";
import type { IndexVault } from "../../index-vault/types";
import { demoIndexVaults, indexVaults } from "../constants";
import { currencyFormatterWithoutDecimals } from "../../shared/helpers";
import { InfoIcon, Tooltip } from "../../shared/components";
import { chainsMap } from "../../wallet/constants";
import type { DemoIndexVaultConfig } from "../types";
import { VaultModalType } from "../../root/types";
import { getVaultTypeTitle } from "../../index-vault/helpers";
import { RiskLevelCell } from "../../basic/components/RiskLevelCell";

import { PercentageYieldsTooltip } from "./PercentageYieldsTooltip";

type IndexVaultRow = DemoIndexVaultConfig | IndexVault;

const columns: Column<IndexVaultRow>[] = [
  {
    key: "assetSymbol",
    title: "Stronghold",

    render: ({ type, assetSymbol, collateralSymbol }) => (
      <AssetCell
        assetSymbol={assetSymbol}
        collateralSymbol={collateralSymbol}
        type={type}
        vaultType={VaultModalType.index}
      />
    ),

    filterBy: true,
  },
  {
    key: "type",
    title: "Strategy",

    render: ({ type }) => <CellValue>{getVaultTypeTitle(type)}</CellValue>,

    filterBy: ({ type }) => getVaultTypeTitle(type),
  },
  {
    key: "totalRiskLevel",
    title: "Risk",

    tooltipTitle:
      "The risk rating is the approximate riskiness of an asset and the respective option strategy given the current market conditions. The volatility of the asset and the directional component of the option strategy is the 2 main factors in the risk rating calculations.",

    render: ({ totalRiskLevel }) => (
      <RiskLevelCell riskLevel={totalRiskLevel} />
    ),
  },
  {
    key: "totalPercentageYields",
    title: "APY",

    render: ({ id, totalPercentageYields }) => (
      <APYCellContainer>
        <CellValue>{`${totalPercentageYields.annualPercentageYield}%`}</CellValue>
        <Tooltip
          content={
            <PercentageYieldsTooltip percentageYields={totalPercentageYields} />
          }
          id={id}
          root={<InfoIcon />}
        />
      </APYCellContainer>
    ),

    sortBy: ({ totalPercentageYields }) =>
      totalPercentageYields.annualPercentageYield,
  },
  {
    key: "totalValueLocked",
    title: "TVL",

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
    minWidth: 160,

    render: (row) => {
      if ("isDemo" in row) {
        return "-";
      }

      const { id, supportedChainIds, chainId } = row;

      return (
        <Chains
          chainIds={supportedChainIds}
          highlightedChainId={chainId}
          vaultId={id}
          vaultType={VaultModalType.index}
        />
      );
    },

    sortBy: ({ supportedChainIds }) => supportedChainIds.length,

    filterBy: ({ supportedChainIds }) =>
      supportedChainIds.map((chain) => chainsMap[chain].title),
  },
  {
    key: "id",
    minWidth: 140,

    render: (row) => {
      if ("isDemo" in row) {
        return <DemoButton />;
      }

      return <SwapButton vaultId={row.id} />;
    },
  },
];

const getRowKey = ({ id }: IndexVaultRow) => id;

export const IndexVaultsTable = () => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);
  const indexVaultsQueries = useIndexVaults(indexVaultsIds);

  const indexVaultsRows = indexVaultsQueries.map(({ data }) => data);
  const rows: (IndexVaultRow | undefined)[] = [
    ...indexVaultsRows,
    ...demoIndexVaults,
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
