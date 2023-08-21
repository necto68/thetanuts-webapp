export const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

export const assetFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 4,
});

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const currencyFormatterWithoutDecimals = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

export const utcDateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});

export const utcTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
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

export const highYieldFormatter = (value: number) => {
  const highYieldValueFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: value > 1000 ? 0 : 2,
  });

  let divisor = 1;
  let postfix = "";

  if (value >= 1000 && value < 1_000_000) {
    divisor = 1000;
    postfix = "K";
  }

  if (value >= 1_000_000) {
    divisor = 1_000_000;
    postfix = "M";
  }

  const formattedValue = highYieldValueFormatter.format(value / divisor);

  return `${formattedValue}${postfix}`;
};

export const strikePriceFormatter = (value: number) =>
  Number.isInteger(value)
    ? currencyFormatterWithoutDecimals.format(value)
    : currencyFormatter.format(value);

export const periodFormatter = (period: number) => {
  const mapPeriodToTitle = new Map([
    [7, "Weekly"],
    [14, "Bi-Weekly"],
    [30, "Monthly"],
  ]);
  const secondsInDay = 60 * 60 * 24;
  const daysInPeriod = Math.floor(period / secondsInDay);

  return mapPeriodToTitle.get(daysInPeriod) ?? `${daysInPeriod}-Day`;
};

export const timerFormatter = (initialSeconds: number) => {
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;

  let remainder = initialSeconds;

  const daysValue = Math.floor(remainder / secondsInDay);
  remainder %= secondsInDay;

  const hoursValue = Math.floor(remainder / secondsInHour);
  remainder %= secondsInHour;

  const minutesValue = Math.floor(remainder / secondsInMinute);
  remainder %= secondsInMinute;

  const secondsValue = remainder;

  const days = daysValue > 0 ? `${daysValue}d` : "";
  const hours = hoursValue > 0 ? `${hoursValue}h` : "";
  const minutes = minutesValue > 0 ? `${minutesValue}m` : "";
  const seconds = secondsValue > 0 ? `${secondsValue}s` : "";

  return [days, hours, minutes, seconds].join(" ");
};

export const expiryFormatter = (expiry: number) => {
  const date = new Date(expiry);

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);

  return [day, month, year].join("");
};
