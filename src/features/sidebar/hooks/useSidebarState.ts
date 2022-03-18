import { useContext } from "react";

import { SidebarStateContext } from "../providers";

export const useSidebarState = () => useContext(SidebarStateContext);
