import type { FC } from "react";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useIsMobile } from "../../shared/hooks";
import type { SidebarState } from "../types";

const defaultSidebarState: SidebarState = {
  isShow: false,
  setIsShow: () => false,
  toggleIsShow: () => undefined,
};

export const SidebarStateContext =
  createContext<SidebarState>(defaultSidebarState);

export const SidebarStateProvider: FC = ({ children }) => {
  const isMobile = useIsMobile();
  const [isShow, setIsShow] = useState(!isMobile);

  useEffect(() => {
    setIsShow(!isMobile);
  }, [isMobile]);

  const toggleIsShow = useCallback(() => {
    if (isMobile) {
      setIsShow((previousIsShow) => !previousIsShow);
    }
  }, [isMobile, setIsShow]);

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
