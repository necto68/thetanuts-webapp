import { Redirect, generatePath, useRouteMatch } from "react-router-dom";

import { PagePathname, ModalPathname } from "../../root/types";
import {
  productionLongCallVaults,
  productionLongPutVaults,
} from "../../basic/constants/productionBasicVaults";

export const LongOptionRedirect = () => {
  const longCallPageUrlMatch = useRouteMatch(PagePathname.longCall);
  const longPutPageUrlMatch = useRouteMatch(PagePathname.longPut);

  const isLongCallPage = longCallPageUrlMatch && !longPutPageUrlMatch;

  const modalPathname = isLongCallPage
    ? ModalPathname.longCallVaultModal
    : ModalPathname.longPutVaultModal;

  const productionLongVaults = isLongCallPage
    ? productionLongCallVaults
    : productionLongPutVaults;

  const basicVaultId = productionLongVaults[0].id;

  const pathname = generatePath(modalPathname, {
    vaultId: basicVaultId,
  });

  const link = {
    pathname,
  };

  return <Redirect to={link} />;
};
