/* eslint-disable @typescript-eslint/prefer-optional-chain */
import Big from "big.js";
import { useCallback, useMemo } from "react";

import { BoostExpander } from "../../index-vault-modal/components";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks/useBasicModalConfig";
import { useVaultModalState } from "../../modal/hooks";
import type { TabType } from "../../basic-vault-modal/types";
import { useBasicModalState } from "../../basic-vault-modal/hooks";

export const BoostContent = () => {
  const [vaultModalState, setVaultModalState] = useVaultModalState();
  const { basicVaultReaderQuery, lendingPoolReaderQuery } =
    useBasicModalConfig();
  const { activePositionData } = useBasicModalState();

  const boostBalance =
    activePositionData && activePositionData.balance
      ? activePositionData.balance.toNumber()
      : 0;

  const { data: lendingPoolReaderData } = lendingPoolReaderQuery;
  const { data: basicVaultReaderData } = basicVaultReaderQuery;

  const { lpBalance = new Big(0) } = basicVaultReaderData ?? {};
  const lpBalanceNumber = lpBalance?.toNumber() ?? 0;

  const { currentLiquidityRate = 0 } = lendingPoolReaderData ?? {};
  const { shouldShowBoost = false } = lendingPoolReaderData ?? {};
  const formattedAPY = (Number(currentLiquidityRate) * 100).toFixed(2);

  const isBoostEnabledForUser =
    useMemo(
      () => (lpBalanceNumber > 0 || boostBalance > 0) && shouldShowBoost,
      [lpBalanceNumber, boostBalance, shouldShowBoost]
    ) ?? false;

  const handleButtonClick = useCallback(() => {
    if ((lpBalanceNumber > 0 || boostBalance > 0) && shouldShowBoost) {
      setVaultModalState({
        ...vaultModalState,
        isShow: true,
        isBoostContentShown: true,
        tabType: "deposit" as TabType,
      });
    }
  }, [
    lpBalanceNumber,
    boostBalance,
    shouldShowBoost,
    setVaultModalState,
    vaultModalState,
  ]);

  return (
    <BoostExpander
      isBoostEnabledForUser={isBoostEnabledForUser}
      onClick={handleButtonClick}
      title={
        shouldShowBoost
          ? `Boost APY = ${formattedAPY}%`
          : "Boost is Unavailable"
      }
    />
  );
};
