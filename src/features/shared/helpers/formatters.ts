export const numberFormatter = new Intl.NumberFormat();

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const addressFormatter = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const totalValueLockedFormatter = (value: number) => {
  const totalValueLockedCurrencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 1,
  });

  let divisor = 1;
  let postfix = "";

  if (value >= 1000 && value < 1_000_000) {
    divisor = 1000;
    postfix = " K";
  }

  if (value >= 1_000_000) {
    divisor = 1_000_000;
    postfix = " M";
  }

  const formattedValue = totalValueLockedCurrencyFormatter.format(
    value / divisor
  );

  return `${formattedValue}${postfix}`;
};
