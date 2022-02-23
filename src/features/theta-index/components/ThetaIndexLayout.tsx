// import { AllVaults } from "../../products/components/AllVaults";

import { TableComponent } from "../../table-component/TableComponent";

import { Container, Title, Description } from "./ThateIndexLayout.styles";
import { FeaturedIndexVaultsList } from "./FeaturedIndexVaultsList";

const PortfolioColumns = [
  {
    title: "Assets",
    sortKey: "assetSymbol",
  },
  {
    title: "Vault",
    sortKey: "vaultType",
  },
  {
    title: "Strategy",
    sortKey: "strategy",
  },
  {
    title: "APY",
    sortKey: "apy",
  },
  {
    title: "Balance",
    sortKey: "balance",
  },
  {
    title: "Value",
    sortKey: "value",
  },
  {
    title: "Chain",
    sortKey: "chain",
  },
  {
    title: " ",
    sortKey: "none",
  },
];

const PortfolioVaultRows = [
  {
    assetSymbol: "ETH",
    vaultType: "Theta-Index",
    strategy: "Call",
    apy: 31.45,
    balance: "2500.098 tETH",
    value: "2500.098",
    chain: "ETH",
  },
  {
    assetSymbol: "SUSHI",
    vaultType: "Theta-Index",
    strategy: "Put",
    apy: 10.49,
    balance: "1209.098 tETH",
    value: "1600.098",
    chain: "ETH",
  },
  {
    assetSymbol: "LINK",
    vaultType: "Theta-Index",
    strategy: "Call",
    apy: 17.45,
    balance: "2800.098 tETH",
    value: "2400.098",
    chain: "ETH",
  },
  {
    assetSymbol: "AAVE",
    vaultType: "Theta-Index",
    strategy: "Call",
    apy: 22.65,
    balance: "2800.098 tETH",
    value: "2400.098",
    chain: "ETH",
  },
  {
    assetSymbol: "YEARN",
    vaultType: "Theta-Index",
    strategy: "Call",
    apy: 8.72,
    balance: "2800.098 tETH",
    value: "2400.098",
    chain: "ETH",
  },
  {
    assetSymbol: "SNX",
    vaultType: "Theta-Index",
    strategy: "Call",
    apy: 19.45,
    balance: "2800.098 tETH",
    value: "2400.098",
    chain: "ETH",
  },
];

export const ThetaIndexLayout = () => (
  <Container>
    <Title>Theta-Index</Title>
    <Description>
      A Theta-Index earns yield by running an automated portfolio of either
      covered call or put-selling strategies. When you swap in your assets, you
      will receive a tokenized version of your asset which represents your
      pro-rata ownership of that Theta-Index. Your swapped assets are
      auto-compounded. The option strikes and expirations of each covered call
      or put selling strategy is algorithmically determined to maximize yield
      while reducing the risks of having the options exercised. You can swap in
      and out anytime & Thetanuts does not collect any fees.
    </Description>
    <Description>
      For a more detailed understanding of how a Theta-Index work, read the
      Thetanuts Docs. If you have any other questions, feel free to post them on
      Thetanuts Discord.
    </Description>
    <Title>Featured Theta-Index Vaults</Title>
    <FeaturedIndexVaultsList />

    <TableComponent columns={PortfolioColumns} rows={PortfolioVaultRows} />
  </Container>
);
