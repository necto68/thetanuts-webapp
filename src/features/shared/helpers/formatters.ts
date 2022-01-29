export const numberFormatter = new Intl.NumberFormat();

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const addressFormatter = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;
