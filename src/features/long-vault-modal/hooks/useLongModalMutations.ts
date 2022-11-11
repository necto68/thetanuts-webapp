import { useContext } from "react";

import { LongModalMutationsContext } from "../providers/LongModalMutationsProvider";

export const useLongModalMutations = () =>
  useContext(LongModalMutationsContext);
