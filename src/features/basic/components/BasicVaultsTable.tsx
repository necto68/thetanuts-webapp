import {
  APYCellContainer,
  Chains,
  DepositButton,
  GreenCellValue,
  Table,
} from "../../table/components";
import type { Column } from "../../table/types";
import { useBasicVaults } from "../../basic-vault/hooks";
import { basicVaults } from "../constants";
import { InfoIcon, Tooltip } from "../../shared/components";
import { chainsMap } from "../../wallet/constants";
import { PercentageYieldsTooltip } from "../../theta-index/components";
import { BasicVaultCapacity } from "../../basic-vault/components/BasicVaultCapacity";
import { VaultModalType } from "../../root/types";
import type { BasicVault } from "../../basic-vault/types";

import { BasicVaultAssetCell } from "./BasicVaultAssetCell";
import { StrategyCell } from "./StrategyCell";

const columns: Column<BasicVault>[] = [
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

    render: ({ id, percentageYields }) => (
      <APYCellContainer>
        <GreenCellValue>{`${percentageYields.annualPercentageYield}%`}</GreenCellValue>
        <Tooltip
          content={
            <PercentageYieldsTooltip percentageYields={percentageYields} />
          }
          id={id}
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

    render: ({ id, chainId }) => (
      <Chains
        chainIds={[chainId]}
        vaultId={id}
        vaultType={VaultModalType.basic}
      />
    ),

    filterBy: ({ chainId }) => chainsMap[chainId].title,
  },
  {
    key: "id",

    render: ({ id, chainId }) => (
      <DepositButton chainId={chainId} vaultId={id} />
    ),
  },
];

const getRowKey = ({ id, chainId }: BasicVault) => `${id}${chainId}`;

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
