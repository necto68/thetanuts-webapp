import { ArrowIcon } from "../../shared/components";
import { useVaults } from "../../vault/hooks";
import { useSortBy } from "../hooks";
import type { Vault } from "../../vault/types";
import { VaultType } from "../../vault/constants";
import { getCurrentDepositRate } from "../../vault/helpers";

import { VaultRow } from "./VaultRow";
import {
  Container,
  Title,
  VaultsTable,
  HeaderRow,
  HeaderCell,
  SortContainer,
  SortButton,
  SortArrowContainer,
  Header,
} from "./AllVaults.styles";

interface Column<RowData> {
  title: string;
  sortKey: keyof RowData;
  sortBy?: (rowData: RowData) => number | string | null;
}

const columns: Column<Vault>[] = [
  {
    title: "Asset Type",
    sortKey: "assetSymbol",
  },
  {
    title: "Deposit Type",
    sortKey: "depositSymbol",
  },
  {
    title: "Strategy",
    sortKey: "type",
    sortBy: ({ type }) => VaultType[type],
  },
  {
    title: "Risk Level",
    sortKey: "riskLevel",
  },
  {
    title: "APYs",
    sortKey: "apy",
  },
  {
    title: "Max Capacity",
    sortKey: "maxDeposit",
  },
  {
    title: "Vault Capacity",
    sortKey: "currentDeposit",

    sortBy: ({ currentDeposit, maxDeposit }) =>
      getCurrentDepositRate(currentDeposit, maxDeposit),
  },
  {
    title: "Positions",
    sortKey: "userPosition",
    sortBy: ({ userPosition }) => (userPosition ? userPosition.toNumber() : 0),
  },
];

export const AllVaults = () => {
  const vaults = useVaults();
  const [sortedVaults, sortState, updateSort] = useSortBy(
    vaults,
    ({ address }) => address
  );

  return (
    <Container>
      <Title>Metavaults Performance</Title>
      <VaultsTable>
        <thead>
          <HeaderRow>
            {columns.map(({ title, sortKey, sortBy }) => (
              <HeaderCell key={title}>
                <SortButton
                  onClick={() => {
                    updateSort(sortKey, sortBy);
                  }}
                >
                  <SortContainer>
                    <Header>{title}</Header>
                    <SortArrowContainer show={sortState.key === sortKey}>
                      <ArrowIcon up={sortState.order === "ASC"} />
                    </SortArrowContainer>
                  </SortContainer>
                </SortButton>
              </HeaderCell>
            ))}
          </HeaderRow>
        </thead>
        <tbody>
          {sortedVaults.map(({ address }) => (
            <VaultRow key={address} vaultAddress={address} />
          ))}
        </tbody>
      </VaultsTable>
    </Container>
  );
};
