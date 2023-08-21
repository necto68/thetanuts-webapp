import { useContext } from "react";

import { ClosePositionModalStateContext } from "../providers/ClosePositionModalStateProvider";

export const useClosePositionModalState = () =>
  useContext(ClosePositionModalStateContext);
