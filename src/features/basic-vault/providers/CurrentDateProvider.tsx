import type { FC } from "react";
import { createContext, useEffect, useMemo, useState } from "react";

import type { CurrentDateState } from "../types";

const defaultCurrentDateState: CurrentDateState = {
  currentDate: 0,
};

export const CurrentDateContext = createContext<CurrentDateState>(
  defaultCurrentDateState
);

export const CurrentDateProvider: FC = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const value = useMemo(
    () => ({
      currentDate,
    }),
    [currentDate]
  );

  return (
    <CurrentDateContext.Provider value={value}>
      {children}
    </CurrentDateContext.Provider>
  );
};
