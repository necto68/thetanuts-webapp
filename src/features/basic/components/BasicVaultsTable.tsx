import {
  APYCellContainer,
  CellValue,
  GreenCellValue,
  Chains,
  DepositButton,
  Table,
} from "../../table/components";
import type { Column } from "../../table/types";
import { useBasicVaults } from "../../basic-vault/hooks";
import { basicVaults } from "../constants";
import { IconContainer, Tooltip } from "../../shared/components";
import { chainIconSymbols, ChainId, chainsMap } from "../../wallet/constants";
import { PercentageYieldsTooltip } from "../../theta-index/components";
import { VaultModalType } from "../../root/types";
import type { BasicVault } from "../../basic-vault/types";
import { BasicVaultCapacityPercent } from "../../basic-vault/components/BasicVaultCapacityPercent";
import { WithdrawButton } from "../../table/components/WithdrawButton";
import { getVaultModalType } from "../helpers";
import { getVaultTitle } from "../../table/helpers";
import { periodFormatter } from "../../shared/helpers";
import { getVaultTypeStrategy } from "../../index-vault/helpers";
import { useSortedBasicVaultsIds } from "../hooks";
import { getLogoBySymbol } from "../../logo/helpers";

import { StrikePriceCell } from "./StrikePriceCell";
import { BasicVaultAssetCell } from "./BasicVaultAssetCell";
import { StrategyCell } from "./StrategyCell";
import { ActionsContainer } from "./ActionsCell";
import { RewardAPYContainer } from "./BasicVaultsTable.styles";

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

    filterBy: ({
      assetSymbol,
      collateralSymbol,
      type,
      basicVaultType,
      period,
    }) => [
      assetSymbol,
      collateralSymbol,
      getVaultTitle(
        getVaultModalType(basicVaultType),
        type,
        assetSymbol,
        collateralSymbol
      ),
      periodFormatter(period),
      getVaultTypeStrategy(type),
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

    render: ({ id, percentageYields, rewardAnnualPercentageRate }) => (
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
        {/* TODO: remove for stMATIC vault */}
        {id === "TN-CSCCv1-STMATICUSD" ? (
          <Tooltip
            content="Reward APR"
            id={`${id}-reward`}
            place="top"
            root={
              <RewardAPYContainer>
                <GreenCellValue>{rewardAnnualPercentageRate}%</GreenCellValue>
                <IconContainer height={16} width={16}>
                  {getLogoBySymbol(chainIconSymbols[ChainId.ZK_EVM])}
                </IconContainer>
              </RewardAPYContainer>
            }
          />
        ) : null}
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
        vaultType={VaultModalType.basic}
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
          vaultType={VaultModalType.basic}
        />
        <WithdrawButton
          chainId={chainId}
          vaultId={id}
          vaultType={VaultModalType.basic}
        />
      </ActionsContainer>
    ),
  },
];

const getRowKey = ({ id, chainId }: BasicVault) => `${id}${chainId}`;

export const BasicVaultsTable = () => {
  const sortedBasicVaultIds = useSortedBasicVaultsIds(basicVaults);
  const basicVaultsQueries = useBasicVaults(sortedBasicVaultIds);

  const rows = basicVaultsQueries.map(({ data }) => data);

  return (
    <Table
      columns={columns}
      filterInputPlaceholder="Search by Product or Strategy"
      getRowKey={getRowKey}
      rows={rows}
    />
  );
};
