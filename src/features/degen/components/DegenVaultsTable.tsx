import {
  APYCellContainer,
  Chains,
  DepositButton,
  GreenCellValue,
  Table,
} from "../../table/components";
import type { Column } from "../../table/types";
import { degenVaults } from "../../basic/constants";
import { InfoIcon, Tooltip } from "../../shared/components";
import { chainsMap } from "../../wallet/constants";
import { PercentageYieldsTooltip } from "../../theta-index/components";
import { BasicVaultCapacity } from "../../basic-vault/components/BasicVaultCapacity";
import { VaultModalType } from "../../root/types";
import type { BasicVault } from "../../basic-vault/types";
import { ProgressBarColor } from "../../basic-vault/types";
import { BasicVaultAssetCell, RiskLevelCell } from "../../basic/components";
import { useBasicVaults } from "../../basic-vault/hooks";
import { highYieldFormatter } from "../../shared/helpers";
import { StrikePriceCell } from "../../basic/components/StrikePriceCell";

import { StrategyCell } from "./StrategyCell";

const columns: Column<BasicVault>[] = [
  {
    key: "assetSymbol",
    title: "Degen Vault",
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

    render: ({ type }) => <StrategyCell type={type} />,

    sortBy: ({ type }) => type,
  },
  {
    key: "strikePrices",
    title: "Strike Price",
    minWidth: 120,

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

    sortBy: ({ type }) => type,
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
        <GreenCellValue>{`${highYieldFormatter(
          percentageYields.annualPercentageYield
        )}%`}</GreenCellValue>
        <Tooltip
          content={
            <PercentageYieldsTooltip percentageYields={percentageYields} />
          }
          id={id}
          root={<InfoIcon />}
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
      <BasicVaultCapacity
        balance={balance}
        collatCap={collatCap}
        collateralSymbol={collateralSymbol}
        progressBarColor={ProgressBarColor.red}
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
        vaultType={VaultModalType.degen}
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
        vaultType={VaultModalType.degen}
      />
    ),
  },
];

const getRowKey = ({ id, chainId }: BasicVault) => `${id}${chainId}`;

export const DegenVaultsTable = () => {
  const degenVaultsIds = degenVaults.map(({ id }) => id);
  const degenVaultsQueries = useBasicVaults(degenVaultsIds);

  const rows = degenVaultsQueries.map(({ data }) => data);

  return (
    <Table
      columns={columns}
      filterInputPlaceholder="Filter by asset or network"
      getRowKey={getRowKey}
      rows={rows}
    />
  );
};