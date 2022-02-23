import {
  Table,
  APYCellValue,
  Chains,
  SwapButton,
} from "../../table/components";
import type { Column } from "../../table/types";
import { useIndexVaults } from "../../index-vault/hooks/useIndexVaults";
import type { IndexVault } from "../../index-vault/types";
import { indexVaults } from "../constants";
import { VaultType } from "../../vault/constants";
import { currencyFormatterWithoutDecimals } from "../../shared/helpers";

const columns: Column<IndexVault>[] = [
  {
    key: "assetSymbol",
    title: "Asset",
  },
  {
    key: "type",
    title: "Strategy",
    render: ({ type }) => (type === VaultType.CALL ? "Call" : "Put"),
  },
  {
    key: "totalAnnualPercentageYield",
    title: "Consolidated APY",

    render: ({ totalAnnualPercentageYield }) => (
      <APYCellValue>{`${totalAnnualPercentageYield}%`}</APYCellValue>
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
  },
  {
    key: "id",
    render: ({ id }) => <SwapButton indexVaultId={id} />,
  },
];

export const IndexVaultsTable = () => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);
  const indexVault = useIndexVaults(indexVaultsIds);

  const rows = indexVault.map(({ data }) => data);

  return <Table columns={columns} rows={rows} />;
};
