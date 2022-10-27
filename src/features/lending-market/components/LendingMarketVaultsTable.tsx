import { Chains, OpenButton, Table } from "../../table/components";
import type { Column } from "../../table/types";
import { chainsMap } from "../../wallet/constants";
import { VaultModalType } from "../../root/types";
import type { BasicVault } from "../../basic-vault/types";
import { BasicVaultAssetCell, StrategyCell } from "../../basic/components";
import { useLendingMarketVaultsTableRows } from "../hooks";
import type { LendingMarketVaultRow } from "../types";
import { numberFormatter } from "../../shared/helpers";

const columns: Column<LendingMarketVaultRow>[] = [
  {
    key: "assetSymbol",
    title: "Lending Market",
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

    render: ({
      type,
      period,
      strikePrices,
      isSettled,
      isExpired,
      isAllowInteractions,
    }) => (
      <StrategyCell
        isAllowInteractions={isAllowInteractions}
        isExpired={isExpired}
        isSettled={isSettled}
        period={period}
        strikePrices={strikePrices}
        type={type}
      />
    ),

    sortBy: ({ type }) => type,
  },

  {
    key: "totalPosition",
    title: "Total Position",
    minWidth: 180,

    render: ({ totalPosition }) =>
      totalPosition
        ? `${numberFormatter.format(totalPosition.toNumber())} !!!TOKEN`
        : "-",

    sortBy: ({ totalPosition }) =>
      totalPosition ? totalPosition.toNumber() : 0,
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
      <OpenButton
        chainId={chainId}
        vaultId={id}
        vaultType={VaultModalType.lendingMarket}
      />
    ),
  },
];

const getRowKey = ({ id, chainId }: BasicVault) => `${id}${chainId}`;

export const LendingMarketVaultsTable = () => {
  const rows = useLendingMarketVaultsTableRows();

  return (
    <Table
      columns={columns}
      filterInputPlaceholder="Filter by asset or network"
      getRowKey={getRowKey}
      rows={rows}
    />
  );
};
