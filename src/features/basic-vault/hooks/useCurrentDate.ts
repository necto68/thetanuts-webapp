import { useContext } from "react";

import { CurrentDateContext } from "../providers";

export const useCurrentDate = () => useContext(CurrentDateContext);
