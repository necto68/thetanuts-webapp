import type { ClosePositionTabType } from "./ClosePositionTabType";

export interface ClosePositionModalState {
  tabType: ClosePositionTabType;
  setTabType: (tabType: ClosePositionTabType) => void;
}
