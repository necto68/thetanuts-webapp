import type { FC } from "react";
import { useState, useEffect } from "react";
import moment from "moment";

import { SkeletonBox } from "../../shared/components";
import type { Vault } from "../../vault/types";

import { DataContainer, DataTitle, DataValue } from "./EpochExpiration.styles";

type EpochExpirationProps = Pick<
  Vault,
  "expiry" | "isEpochExpired" | "isEpochSettled"
>;

const formatExpirationString = (milliseconds: number) => {
  const duration = moment.duration(milliseconds);

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return [
    days > 0 ? `${days}d` : "",
    hours > 0 ? `${hours}h` : "",
    minutes > 0 ? `${minutes}m` : "",
    seconds > 0 ? `${seconds}s` : "",
  ].join(" ");
};

const getEpochExpirationValue = (
  isEpochSettled: boolean,
  isEpochExpired: boolean,
  expiry: number,
  initialDate: number,
  elapsedMilliseconds: number
): string => {
  if (isEpochSettled) {
    return "Settled";
  }

  if (isEpochExpired) {
    return "Expired";
  }

  return formatExpirationString(expiry - initialDate - elapsedMilliseconds);
};

export const EpochExpiration: FC<EpochExpirationProps> = ({
  expiry,
  isEpochSettled = false,
  isEpochExpired = false,
}) => {
  const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);
  const [initialDate, setInitialDate] = useState(Date.now());

  useEffect(() => {
    setInitialDate(Date.now());

    const intervalId = setInterval(() => {
      setElapsedMilliseconds((value) => value + 1000);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (typeof expiry === "undefined") {
    return (
      <DataContainer>
        <DataTitle>Epoch Expiry</DataTitle>
        <SkeletonBox height={27} width={70} />
      </DataContainer>
    );
  }

  const epochExpirationValue = getEpochExpirationValue(
    isEpochSettled,
    isEpochExpired,
    expiry,
    initialDate,
    elapsedMilliseconds
  );

  return (
    <DataContainer>
      <DataTitle>Epoch Expiry</DataTitle>
      <DataValue>{epochExpirationValue}</DataValue>
    </DataContainer>
  );
};
