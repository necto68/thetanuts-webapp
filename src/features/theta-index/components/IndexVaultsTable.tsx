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
import {Tooltip} from '../../shared/components/Tooltip' 
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
      <div style={{display:'flex',alignItems:'center'}}>
         <APYCellValue>{`${totalAnnualPercentageYield}%`}</APYCellValue>
         <Tooltip 
          color="white"
          type="table"
          toolTipId="tableToolTip" 
          WPY='0.82'
          MPY='3.61'
          APR='42.8'
          APY='53.1'
          
          />
      </div>
     
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

const getRowKey = ({ id }: IndexVault) => id;

export const IndexVaultsTable = () => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);
  const indexVaultsQueries = useIndexVaults(indexVaultsIds);

  const rows = indexVaultsQueries.map(({ data }) => data);

  return <Table columns={columns} getRowKey={getRowKey} rows={rows} />;
};
