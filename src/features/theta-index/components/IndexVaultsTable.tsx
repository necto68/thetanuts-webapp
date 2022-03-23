import {
  Table,
  APYCellContainer,
  APYCellValue,
  Chains,
  SwapButton,
  AssetCell,
} from "../../table/components";
import type { Column } from "../../table/types";
import { useIndexVaults } from "../../index-vault/hooks";
import type { IndexVault } from "../../index-vault/types";
import { indexVaults } from "../constants";
import { currencyFormatterWithoutDecimals } from "../../shared/helpers";
import { InfoIcon, Tooltip } from "../../shared/components";
import { chainsMap } from "../../wallet/constants";

import { PercentageYieldsTooltip } from "./PercentageYieldsTooltip";

const columns: Column<IndexVault>[] = [
  {
    key: "assetSymbol",
    title: "Asset",
    render: ({ assetSymbol }) => <AssetCell assetSymbol={assetSymbol} />,
    filterBy: true,
  },
  {
    key: "totalPercentageYields",
    title: "Consolidated APY",

    render: ({ id, totalPercentageYields }) => (
      <APYCellContainer>
        <APYCellValue>{`${totalPercentageYields.annualPercentageYield}%`}</APYCellValue>
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

    render: ({ totalValueLocked }) =>
      currencyFormatterWithoutDecimals.format(totalValueLocked),
  },
  {
    key: "supportedChainIds",
    title: "Chains",
    render: ({ supportedChainIds }) => <Chains chainIds={supportedChainIds} />,
    sortBy: ({ supportedChainIds }) => supportedChainIds.length,

    filterBy: ({ supportedChainIds }) =>
      supportedChainIds.map((chain) => chainsMap[chain].title),
  },
  {
    key: "id",
    render: ({ id }) => <SwapButton indexVaultId={id} />,
  },
];

const getRowKey = ({ id }: IndexVault) => id;

export const IndexVaultsTable = () => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);
  const indexVaultsQueries = useIndexVaults(indexVaultsIds);

  const rows = indexVaultsQueries.map(({ data }) => data);

  return (
    <Table
      columns={columns}
      filterInputPlaceholder="Filter by asset or chain"
      getRowKey={getRowKey}
      rows={rows}
    />
  );
};
