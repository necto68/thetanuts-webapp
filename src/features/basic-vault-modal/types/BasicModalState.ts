import type { TabType } from "./TabType";

export interface BasicModalState {
  tabType: TabType;
  setTabType: (tabType: TabType) => void;
}
