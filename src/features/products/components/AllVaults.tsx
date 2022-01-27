import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BaseButton, ArrowIcon } from '../../shared/components';
import { useVaults } from '../../vault/hooks';
import { VaultRow } from './VaultRow';
import { useSortBy } from '../hooks';
import { Vault } from '../../vault/types';
import { VaultTypes } from '../../vault/constants';
import { getCurrentDepositRate } from '../../vault/helpers';

interface Column<T> {
  title: string;
  sortKey: keyof T;
  sortBy?: (element: T) => any;
}

const columns: Column<Vault>[] = [
  {
    title: 'Asset Type',
    sortKey: 'assetSymbol',
  },
  {
    title: 'Deposit Type',
    sortKey: 'depositSymbol',
  },
  {
    title: 'Strategy',
    sortKey: 'type',
    // sortBy: ({ type }) => VaultTypes[type],
  },
  {
    title: 'Risk Level',
    sortKey: 'riskLevel',
  },
  {
    title: 'APY',
    sortKey: 'apy',
  },
  {
    title: 'Max Capacity',
    sortKey: 'maxDeposit',
  },
  {
    title: 'Vault Capacity',
    sortKey: 'currentDeposit',
    sortBy: ({ currentDeposit, maxDeposit }) =>
      getCurrentDepositRate(currentDeposit, maxDeposit),
  },
  {
    title: 'Position',
    sortKey: 'userPosition',
    sortBy: ({ userPosition }) => (userPosition ? userPosition.toNumber() : 0),
  },
];

export const AllVaults = () => {
  const vaults = useVaults();
  const [sortedVaults, sortState, updateSort] = useSortBy(
    vaults,
    ({ address }) => address,
  );

  return (
    <Container>
      <Title>Metavaults Performance</Title>
      <VaultsTable>
        <thead>
          <HeaderRow>
            {columns.map(({ title, sortKey, sortBy }) => (
              <HeaderCell key={title}>
                <SortButton onClick={() => updateSort(sortKey, sortBy)}>
                  <SortContainer>
                    <Header>{title}</Header>
                    <SortArrowContainer show={sortState.key === sortKey}>
                      <ArrowIcon up={sortState?.order === 'ASC'} />
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 32px;
  color: #e5e5e5;
`;

const VaultsTable = styled.table`
  width: 100%;
`;

const HeaderRow = styled.tr`
  background-color: #010c1a;
`;

const HeaderCell = styled.th`
  &:first-child {
    border-top-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
  }
`;

const SortContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 15px 20px;
`;

const SortButton = styled(BaseButton)`
  border: none;
  box-shadow: none !important;
  border-radius: 0;
  padding: 0;
`;

const SortArrowContainer = styled(motion.div).attrs<{ show: boolean }>(
  ({ show }) => ({
    animate: {
      opacity: show ? 1 : 0,
    },
  }),
)<{ show: boolean }>``;

const Header = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
`;
