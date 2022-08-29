import { useContext } from "react";

import { BasicModalStateContext } from "../providers/BasicModalStateProvider";

export const useBasicModalState = () => useContext(BasicModalStateContext);
