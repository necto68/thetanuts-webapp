import type { FC } from "react";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useIsTablet } from "../../shared/hooks";
import type { SidebarState } from "../types";

const defaultSidebarState: SidebarState = {
  isShow: false,
  setIsShow: () => false,
  toggleIsShow: () => undefined,
};

export const SidebarStateContext =
  createContext<SidebarState>(defaultSidebarState);

export const SidebarStateProvider: FC = ({ children }) => {
  const isTablet = useIsTablet();
  const [isShow, setIsShow] = useState(!isTablet);

  useEffect(() => {
    setIsShow(!isTablet);
  }, [isTablet]);

  const toggleIsShow = useCallback(() => {
    if (isTablet) {
      setIsShow((previousIsShow) => !previousIsShow);
    }
  }, [isTablet, setIsShow]);

  const value = useMemo(
    () => ({
      isShow,
      setIsShow,
      toggleIsShow,
    }),
    [isShow, setIsShow, toggleIsShow]
  );

  return (
    <SidebarStateContext.Provider value={value}>
      {children}
    </SidebarStateContext.Provider>
  );
};
