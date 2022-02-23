import { ArrowIcon } from "../../shared/components";
import { useVaults } from "../../vault/hooks";
import { useSortBy } from "../hooks";
import type { Vault } from "../../vault/types";
import { VaultType } from "../../vault/constants";
import { getCurrentDepositRate } from "../../vault/helpers";

import { VaultRow } from "./VaultRow";

import {
  Container,
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


// const columns: Column<Vault>[] = [
//   {
//     title: "Assets",
//     sortKey: "assetSymbol",
//   },
//   {
//     title: "Vault",
//     sortKey: "depositSymbol",
//   },
//   {
//     title: "Strategy",
//     sortKey: "type",
//     sortBy: ({ type }) => VaultType[type],
//   },
//   {
//     title: "APY",
//     sortKey: "apy",
//   },
//   {
//     title: "Balance",
//     sortKey: "maxDeposit",
//   },
//   {
//     title: "Value",
//     sortKey: "currentDeposit",

//     sortBy: ({ currentDeposit, maxDeposit }) =>
//       getCurrentDepositRate(currentDeposit, maxDeposit),
//   },
//   {
//     title: "Chain",
//     sortKey: "userPosition",
//     sortBy: ({ userPosition }) => (userPosition ? userPosition.toNumber() : 0),
//   },
//   {
//     title: " ",
//     sortKey: "userPosition",
//   },
// ];



//1.add type for columns and rows

export const AllVaults = ({columns, rows}) => {
  // const vaults = useVaults();
  const [sortedVaults, sortState, updateSort] = useSortBy(
    vaults,
    ({ address }) => address
  );

  

  return (
    <Container>
      
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
          {/* {sortedVaults.map(({ address }) => (
            <VaultRow key={address} vaultAddress={address} />
          ))} */}
          {rows.map(( VaultRow ) => (
            <GregVaultRow VaultRow={VaultRow} key={VaultRow.assets} />
          ))}
        </tbody>
      </VaultsTable>
    </Container>
  );
};
