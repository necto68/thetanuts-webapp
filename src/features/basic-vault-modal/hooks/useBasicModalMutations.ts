import { useContext } from "react";

import { BasicModalMutationsContext } from "../providers/BasicModalMutationsProvider";

export const useBasicModalMutations = () =>
  useContext(BasicModalMutationsContext);
