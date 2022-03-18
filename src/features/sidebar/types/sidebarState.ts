import type { Dispatch, SetStateAction } from "react";

export interface SidebarState {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  toggleIsShow: () => void;
}
