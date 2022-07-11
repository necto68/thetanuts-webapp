import { useState } from "react";

import { TabType } from "../types";

export const useBasicModalProviderState = () => {
  const [tabType, setTabType] = useState(TabType.deposit);

  return {
    tabType,
    setTabType,
  };
};
