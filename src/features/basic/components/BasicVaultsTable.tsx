import {
  Table,
  APYCellContainer,
  GreenCellValue,
  Chains,
  DemoButton,
} from "../../table/components";
import type { Column } from "../../table/types";
import { useBasicVaults } from "../../basic-vault/hooks";
import type { Vault } from "../../index-vault/types";
import { basicVaults } from "../constants";
import { InfoIcon, Tooltip } from "../../shared/components";
import { chainsMap } from "../../wallet/constants";
import { PercentageYieldsTooltip } from "../../theta-index/components";
import { BasicVaultCapacity } from "../../basic-vault/components/BasicVaultCapacity";

import { BasicVaultAssetCell } from "./BasicVaultAssetCell";
import { StrategyCell } from "./StrategyCell";

const columns: Column<Vault>[] = [
  {
    key: "assetSymbol",
    title: "Option Vault",

    render: ({
      type,
      assetSymbol,
      collateralSymbol,
      expiry,
      isSettled,
      isExpired,
    }) => (
      <BasicVaultAssetCell
        assetSymbol={assetSymbol}
        collateralSymbol={collateralSymbol}
        expiry={expiry}
        isExpired={isExpired}
        isSettled={isSettled}
        type={type}
      />
    ),

    filterBy: ({ assetSymbol, collateralSymbol }) => [
      assetSymbol,
      collateralSymbol,
    ],
  },
  {
    key: "type",
    title: "Strategy",
    render: ({ type, period }) => <StrategyCell period={period} type={type} />,
    sortBy: ({ type }) => type,
  },
  {
    title: "Risk",
    render: () => "Low",
  },
  {
    key: "percentageYields",
    title: "APY",

    render: ({ vaultAddress, percentageYields }) => (
      <APYCellContainer>
        <GreenCellValue>{`${percentageYields.annualPercentageYield}%`}</GreenCellValue>
        <Tooltip
          content={
            <PercentageYieldsTooltip percentageYields={percentageYields} />
          }
          id={vaultAddress}
          root={<InfoIcon theme="light" />}
        />
      </APYCellContainer>
    ),

    sortBy: ({ percentageYields }) => percentageYields.annualPercentageYield,
  },
  {
    key: "balance",
    title: "Capacity",

    render: ({ type, collateralSymbol, balance, collatCap }) => (
      <BasicVaultCapacity
        balance={balance}
        collatCap={collatCap}
        collateralSymbol={collateralSymbol}
        type={type}
      />
    ),

    sortBy: ({ balance, collatCap }) =>
      collatCap.gt(0) ? balance.div(collatCap).toNumber() : 0,
  },
  {
    key: "chainId",
    title: "Network",

    render: ({ chainId }) => <Chains chainIds={[chainId]} />,

    filterBy: ({ chainId }) => chainsMap[chainId].title,
  },
  {
    key: "vaultAddress",

    render: () => <DemoButton />,
  },
];

const getRowKey = ({ vaultAddress, chainId }: Vault) =>
  `${vaultAddress}${chainId}`;

// eslint-disable-next-line react/no-multi-comp
export const BasicVaultsTable = () => {
  const basicVaultsIds = basicVaults.map(({ id }) => id);
  const basicVaultsQueries = useBasicVaults(basicVaultsIds);

  const rows = basicVaultsQueries.map(({ data }) => data);

  return (
    <Table
      columns={columns}
      filterInputPlaceholder="Filter by asset or network"
      getRowKey={getRowKey}
      rows={rows}
    />
  );
};
