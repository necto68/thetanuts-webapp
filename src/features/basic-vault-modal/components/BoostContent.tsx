import Big from "big.js";
import { useCallback, useMemo, useState } from "react";
import { BoostExpander } from "../../index-vault-modal/components";
import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import { useVaultModalState } from "../../modal/hooks";
import { TabType } from "../../basic-vault-modal/types";

export const BoostContent = () => {
  const [ vaultModalState, setVaultModalState ] = useVaultModalState();
  const { isRouterModal, vaultType, isBoostContentShown } = vaultModalState;
  const { basicVaultReaderQuery, lendingPoolReaderQuery } = useBasicModalConfig();

  const { data: lendingPoolReaderData, isLoading: isBasicVaultLoading } = lendingPoolReaderQuery;
  const { data: basicVaultReaderData, isLoading: isBasicVaultReaderLoading } =
    basicVaultReaderQuery;

  const { currentPosition = new Big(0) } = basicVaultReaderData ?? {};
  const { lpBalance = new Big(0) } = basicVaultReaderData ?? {};
  const lpBalanceNumber = lpBalance?.toNumber() ?? 0;

  const { currentLiquidityRate = 0 } = lendingPoolReaderData ?? {};
  const { aTokenAddress = '' } = lendingPoolReaderData ?? {};
  const formattedAPY = (Number(currentLiquidityRate) * 100).toFixed(2);

  const handleButtonClick = useCallback(() => {
    if (lpBalanceNumber > 0 && aTokenAddress !== "0x0000000000000000000000000000000000000000") {
      setVaultModalState({
        ...vaultModalState,
        isShow: true,
        isBoostContentShown: true,
        tabType: "deposit" as TabType 
      });
    }
  }, [setVaultModalState, vaultModalState, lpBalanceNumber]);

  return (
    <BoostExpander
      onClick={handleButtonClick}
      title={aTokenAddress !== "0x0000000000000000000000000000000000000000" ? `Boost APY = ${formattedAPY}%` : 'Boost is Unavailable'}
      currentPosition={lpBalanceNumber}
      suppliedTokenAddress={aTokenAddress || ""}
    />
  );
  
};
