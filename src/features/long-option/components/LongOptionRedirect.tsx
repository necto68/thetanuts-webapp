import { Redirect, generatePath } from "react-router-dom";

import { ModalPathname } from "../../root/types";
import { productionLongTradeVaults } from "../../basic/constants/productionBasicVaults";

export const LongOptionRedirect = () => {
  const modalPathname = ModalPathname.longTradeVaultModal;
  const basicVaultId = productionLongTradeVaults[0].id;

  const pathname = generatePath(modalPathname, {
    vaultId: basicVaultId,
  });

  const link = {
    pathname,
  };

  return <Redirect to={link} />;
};
