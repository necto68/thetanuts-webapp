import {
  APYCellContainer,
  CellValue,
  Chains,
  DepositButton,
  Table,
} from "../../table/components";
import type { Column } from "../../table/types";
import { degenVaults } from "../../basic/constants";
import { Tooltip } from "../../shared/components";
import { chainsMap } from "../../wallet/constants";
import { PercentageYieldsTooltip } from "../../theta-index/components";
import { VaultModalType } from "../../root/types";
import type { BasicVault } from "../../basic-vault/types";
import {
  BasicVaultAssetCell,
  StrategyCell,
  StrikePriceCell,
  ActionsContainer,
} from "../../basic/components";
import { useBasicVaults } from "../../basic-vault/hooks";
import { highYieldFormatter } from "../../shared/helpers";
import { BasicVaultCapacityPercent } from "../../basic-vault/components/BasicVaultCapacityPercent";
import { WithdrawButton } from "../../table/components/WithdrawButton";
import { getVaultTitle } from "../../table/helpers";
import { getVaultModalType } from "../../basic/helpers";
import { getVaultTypeStrategy } from "../../index-vault/helpers";
import {
  getDegenVaultTypeShortName,
  getDegenVaultTypeTitle,
} from "../../degen-vault/helpers";
import { useFilteredBasicVaultsIds } from "../../basic/hooks";

const columns: Column<BasicVault>[] = [
  {
    key: "assetSymbol",
    title: "Product",

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

    filterBy: ({ assetSymbol, collateralSymbol, type, basicVaultType }) => [
      assetSymbol,
      collateralSymbol,
      getVaultTitle(
        getVaultModalType(basicVaultType),
        type,
        assetSymbol,
        collateralSymbol
      ),
      getVaultTypeStrategy(type),
      getDegenVaultTypeTitle(type),
      getDegenVaultTypeShortName(type),
    ],
  },
  {
    key: "type",
    title: "Strategy",

    render: ({ basicVaultType, type, period }) => (
      <StrategyCell
        basicVaultType={basicVaultType}
        period={period}
        type={type}
      />
    ),

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

    sortBy: ({ strikePrices }) => strikePrices[0],
  },
  {
    key: "percentageYields",
    title: "APY",

    render: ({ id, percentageYields }) => (
      <APYCellContainer>
        <Tooltip
          content={
            <PercentageYieldsTooltip percentageYields={percentageYields} />
          }
          id={id}
          place="top"
          root={
            <CellValue>{`${highYieldFormatter(
              percentageYields.annualPercentageYield
            )}%`}</CellValue>
          }
        />
      </APYCellContainer>
    ),

    sortBy: ({ percentageYields }) => percentageYields.annualPercentageYield,
  },
  {
    key: "balance",
    title: "Capacity",

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

    render: ({ id, chainId }) => (
      <ActionsContainer>
        <DepositButton
          chainId={chainId}
          vaultId={id}
          vaultType={VaultModalType.degen}
        />
        <WithdrawButton
          chainId={chainId}
          vaultId={id}
          vaultType={VaultModalType.degen}
        />
      </ActionsContainer>
    ),
  },
];

const getRowKey = ({ id, chainId }: BasicVault) => `${id}${chainId}`;

export const DegenVaultsTable = () => {
  const sortedDegenVaultsIds = useFilteredBasicVaultsIds(degenVaults);
  const degenVaultsQueries = useBasicVaults(sortedDegenVaultsIds);

  const rows = degenVaultsQueries.map(({ data }) => data);

  return (
    <Table
      columns={columns}
      filterInputPlaceholder="Search by Product or Strategy"
      getRowKey={getRowKey}
      rows={rows}
    />
  );
};
