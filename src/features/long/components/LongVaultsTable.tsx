import { Chains, OpenButton, Table } from "../../table/components";
import type { Column } from "../../table/types";
import { chainsMap } from "../../wallet/constants";
import { VaultModalType } from "../../root/types";
import type { BasicVault } from "../../basic-vault/types";
import {
  BasicVaultAssetCell,
  StrategyCell,
  StrikePriceCell,
} from "../../basic/components";
import { useLongVaultsTableRows } from "../hooks";
import type { LongVaultRow } from "../types";
import { numberFormatter } from "../../shared/helpers";
import { getLongVaultContractsTitle } from "../../table/helpers";

const columns: Column<LongVaultRow>[] = [
  {
    key: "assetSymbol",
    title: "Long Vault",
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
    key: "currentContractsPosition",
    title: "Active Position",
    minWidth: 180,

    render: ({
      type,
      assetSymbol,
      collateralSymbol,
      currentContractsPosition,
    }) => {
      const contractsTitle = getLongVaultContractsTitle(
        type,
        assetSymbol,
        collateralSymbol
      );

      const formattedCurrentContractsPosition = currentContractsPosition
        ? numberFormatter.format(currentContractsPosition.toNumber())
        : "";

      return currentContractsPosition
        ? `${formattedCurrentContractsPosition} ${contractsTitle}`
        : "-";
    },

    sortBy: ({ currentContractsPosition }) =>
      currentContractsPosition ? currentContractsPosition.toNumber() : 0,
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
        vaultType={VaultModalType.long}
      />
    ),
  },
];

const getRowKey = ({ id, chainId }: BasicVault) => `${id}${chainId}`;

export const LongVaultsTable = () => {
  const rows = useLongVaultsTableRows();

  return (
    <Table
      columns={columns}
      filterInputPlaceholder="Filter by asset or network"
      getRowKey={getRowKey}
      rows={rows}
    />
  );
};
