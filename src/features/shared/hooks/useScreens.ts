import { useMediaMatch } from "rooks";

import { sizes } from "../constants";

export const useIsMobile = () => useMediaMatch(`(max-width: ${sizes.md}px)`);

export const useIsTablet = () => useMediaMatch(`(max-width: ${sizes.xl}px)`);
