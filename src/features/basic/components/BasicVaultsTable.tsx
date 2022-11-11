import {
  APYCellContainer,
  CellValue,
  Chains,
  DepositButton,
  Table,
} from "../../table/components";
import type { Column } from "../../table/types";
import { useBasicVaults } from "../../basic-vault/hooks";
import { basicVaults } from "../constants";
import { Tooltip } from "../../shared/components";
import { chainsMap } from "../../wallet/constants";
import { PercentageYieldsTooltip } from "../../theta-index/components";
import { VaultModalType } from "../../root/types";
import type { BasicVault } from "../../basic-vault/types";
import { BasicVaultCapacityPercent } from "../../basic-vault/components/BasicVaultCapacityPercent";

import { StrikePriceCell } from "./StrikePriceCell";
import { BasicVaultAssetCell } from "./BasicVaultAssetCell";
import { StrategyCell } from "./StrategyCell";
import { RiskLevelCell } from "./RiskLevelCell";

const columns: Column<BasicVault>[] = [
  {
    key: "assetSymbol",
    title: "Basic Vault",
    minWidth: 200,

    render: ({
      basicVaultType,
      type,
      assetSymbol,
      collateralSymbol,
      expiry,
      isSettled,
      isExpired,
      isAllowInteractions,
    }) => (
      <BasicVaultAssetCell
        assetSymbol={assetSymbol}
        basicVaultType={basicVaultType}
        collateralSymbol={collateralSymbol}
        expiry={expiry}
        isAllowInteractions={isAllowInteractions}
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
    minWidth: 110,

    render: ({ type, period }) => <StrategyCell period={period} type={type} />,

    sortBy: ({ type }) => type,
  },
  {
    key: "strikePrices",
    title: "Strike Price",
    minWidth: 110,

    render: ({
      type,
      strikePrices,
      isSettled,
      isExpired,
      isAllowInteractions,
    }) => (
      <StrikePriceCell
        isAllowInteractions={isAllowInteractions}
        isExpired={isExpired}
        isSettled={isSettled}
        strikePrices={strikePrices}
        type={type}
      />
    ),

    sortBy: ({ strikePrices }) => strikePrices[0],
  },
  {
    key: "riskLevel",
    title: "Risk",

    tooltipTitle:
      "The risk rating is the approximate riskiness of an asset and the respective option strategy given the current market conditions. The volatility of the asset and the directional component of the option strategy is the 2 main factors in the risk rating calculations.",

    minWidth: 70,
    render: ({ riskLevel }) => <RiskLevelCell riskLevel={riskLevel} />,
  },
  {
    key: "percentageYields",
    title: "APY",
    minWidth: 110,

    render: ({ id, percentageYields }) => (
      <APYCellContainer>
        <Tooltip
          content={
            <PercentageYieldsTooltip percentageYields={percentageYields} />
          }
          id={id}
          place="top"
          root={
            <CellValue>{`${percentageYields.annualPercentageYield}%`}</CellValue>
          }
        />
      </APYCellContainer>
    ),

    sortBy: ({ percentageYields }) => percentageYields.annualPercentageYield,
  },
  {
    key: "balance",
    title: "Capacity",
    minWidth: 180,

    render: ({ collateralSymbol, balance, collatCap }) => (
      <BasicVaultCapacityPercent
        balance={balance}
        collatCap={collatCap}
        collateralSymbol={collateralSymbol}
      />
    ),

    sortBy: ({ balance, collatCap }) =>
      collatCap.gt(0) ? balance.div(collatCap).toNumber() : 0,
  },
  {
    key: "chainId",
    title: "Network",
    minWidth: 100,

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
    minWidth: 140,

    render: ({ id, chainId }) => (
      <DepositButton
        chainId={chainId}
        vaultId={id}
        vaultType={VaultModalType.basic}
      />
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
