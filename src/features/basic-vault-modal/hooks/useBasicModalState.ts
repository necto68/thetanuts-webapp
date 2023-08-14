import { useContext } from "react";

// eslint-disable-next-line import/no-cycle
import { BasicModalStateContext } from "../providers/BasicModalStateProvider";

export const useBasicModalState = () => useContext(BasicModalStateContext);
