/* eslint-disable @typescript-eslint/prefer-optional-chain */
import Big from "big.js";
import { useCallback, useMemo } from "react";

import { BoostExpander } from "../../index-vault-modal/components";
import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import { useVaultModalState } from "../../modal/hooks";
import type { TabType } from "../types";
import { useBasicModalState } from "../hooks";

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
  const { aTokenAddress = "" } = lendingPoolReaderData ?? {};
  const formattedAPY = (Number(currentLiquidityRate) * 100).toFixed(2);

  const isBoostEnabledForUser = useMemo(
    () =>
      (lpBalanceNumber > 0 || boostBalance > 0) &&
      aTokenAddress !== "0x0000000000000000000000000000000000000000",
    [lpBalanceNumber, boostBalance, aTokenAddress]
  );

  const handleButtonClick = useCallback(() => {
    if (
      (lpBalanceNumber > 0 || boostBalance > 0) &&
      aTokenAddress !== "0x0000000000000000000000000000000000000000"
    ) {
      setVaultModalState({
        ...vaultModalState,
        isShow: true,
        isBoostContentShown: true,
        tabType: "deposit" as TabType,
      });
    }
  }, [
    setVaultModalState,
    vaultModalState,
    lpBalanceNumber,
    boostBalance,
    aTokenAddress,
  ]);

  return (
    <BoostExpander
      isBoostEnabledForUser={isBoostEnabledForUser}
      onClick={handleButtonClick}
      title={
        aTokenAddress !== "0x0000000000000000000000000000000000000000"
          ? `Boost APY = ${formattedAPY}%`
          : "Boost is Unavailable"
      }
    />
  );
};
