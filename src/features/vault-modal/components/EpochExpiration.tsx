import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { SkeletonBox } from '../../shared/components';
import { Vault } from '../../vault/types';

type EpochExpirationProps = Pick<
  Vault,
  'expiry' | 'isEpochSettled' | 'isEpochExpired'
>;

const formatExpirationString = (milliseconds: number) => {
  const duration = moment.duration(milliseconds);

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return [
    days > 0 ? `${days}d` : '',
    hours > 0 ? `${hours}h` : '',
    minutes > 0 ? `${minutes}m` : '',
    seconds > 0 ? `${seconds}s` : '',
  ].join(' ');
};

export const EpochExpiration: FC<EpochExpirationProps> = ({
  expiry,
  isEpochSettled,
  isEpochExpired,
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

  if (typeof expiry === 'undefined') {
    return (
      <DataContainer>
        <DataTitle>Epoch Expiry</DataTitle>
        <SkeletonBox width={70} height={27} />
      </DataContainer>
    );
  }

  const formattedExpiration = formatExpirationString(
    expiry - initialDate - elapsedMilliseconds,
  );

  return (
    <DataContainer>
      <DataTitle>Epoch Expiry</DataTitle>
      <DataValue>
        {isEpochSettled
          ? 'Settled'
          : isEpochExpired
          ? 'Expired'
          : formattedExpiration}
      </DataValue>
    </DataContainer>
  );
};

const DataContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const DataTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  color: #cfcfcf;
`;

const DataValue = styled.span`
  font-family: Barlow;
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
  text-transform: uppercase;
`;
