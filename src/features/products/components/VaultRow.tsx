import { type FC, useCallback } from "react";

import { useVault } from "../../vault/hooks";
import { SkeletonBox } from "../../shared/components";
import {
  type ILVaultMode,
  ILModeTitles,
  RiskLevelTitles,
  vaultTitles,
  VaultType,
} from "../../vault/constants";
import { useModalState } from "../../vault-modal/hooks";
import { numberFormatter } from "../../shared/helpers";
import { getCurrentDepositRate } from "../../vault/helpers";

import {
  Row,
  Cell,
  CellValue,
  RiskLevelValue,
  SwapButton,
  CenteredCell,
} from "./VaultRow.styles";

// import EthIcon from "../../../assets/images/chains/eth.png"

const getStrategyTitle = (
  vaultType: VaultType,
  ILMode: ILVaultMode | null | undefined
) => {
  if (vaultType === VaultType.IL && typeof ILMode === "number") {
    return ILModeTitles[ILMode];
  }

  if ([VaultType.CALL, VaultType.PUT].includes(vaultType)) {
    return vaultTitles[vaultType];
  }

  return null;
};

interface VaultProps {
  vaultAddress: string;
}

export const VaultRow: FC<VaultProps> = ({ vaultAddress }) => {
  const vault = useVault(vaultAddress);
  const [, setModalState] = useModalState();

  const handleRowClick = useCallback(() => {
    setModalState({ isShow: true, vaultAddress });
  }, [setModalState, vaultAddress]);

  if (!vault) {
    return null;
  }

  const {
    type,
    color,
    riskLevel,
    ILMode,
    apy,
    currentDeposit,
    maxDeposit,
    assetSymbol,
    depositSymbol,
    userPosition,
  } = vault;


  // const vaults = [{
  //   assets:'ETH',
  //   strategy:'Call',
  //   apy:'31.45%',
  //   chains: ['ETH','AVAX','POLYGON']
  // }, {
  //   assets:'Another Eth',
  //   strategy:'Put',
  //   apy:'31.45%',
  //   chains: ['ETH']
  // }]

 


  const strategyTitle = getStrategyTitle(type, ILMode);
  const riskLevelTitle = RiskLevelTitles[riskLevel];
  const currentDepositRate = getCurrentDepositRate(currentDeposit, maxDeposit);

  if (
    typeof assetSymbol === "undefined" ||
    typeof depositSymbol === "undefined" ||
    strategyTitle === null ||
    typeof apy === "undefined" ||
    typeof maxDeposit === "undefined" ||
    typeof userPosition === "undefined"
  ) {
    return (
      <Row color={color} onClick={handleRowClick}>
        <Cell>
          <SkeletonBox height={22} width={75} />
        </Cell>
        <Cell>
          <SkeletonBox height={22} width={90} />
        </Cell>
        <Cell>
          <SkeletonBox height={22} width={70} />
        </Cell>
        <Cell>
          <RiskLevelValue riskLevel={riskLevel}>
            {riskLevelTitle}
          </RiskLevelValue>
        </Cell>
        <Cell>
          <SkeletonBox height={22} width={75} />
        </Cell>
        <Cell>
          <SkeletonBox height={22} width={100} />
        </Cell>
        <Cell>
          <SkeletonBox height={22} width={100} />
        </Cell>
        <Cell>
          <SkeletonBox height={22} width={100} />
        </Cell>
      </Row>
    );
  }

  return (
    <Row color={color} onClick={handleRowClick}>
      <Cell>
        <CellValue>
          {/* <img src={EthIcon} alt=""/> */}
          {assetSymbol}
        </CellValue>
      </Cell>
      <Cell>
        <CellValue>{depositSymbol}</CellValue>
      </Cell>
      <Cell>
        <CellValue>{strategyTitle}</CellValue>
      </Cell>
      <Cell>
        <RiskLevelValue riskLevel={riskLevel}>{riskLevelTitle}</RiskLevelValue>
      </Cell>
      <Cell>
        <CellValue>{`${numberFormatter.format(apy)} %`}</CellValue>
      </Cell>
      <Cell>
        <CellValue>{`${numberFormatter.format(
          maxDeposit.toNumber()
        )} ${depositSymbol}`}</CellValue>
      </Cell>
      <Cell>
        <CellValue>{`${currentDepositRate ?? 0} %`}</CellValue>
      </Cell>
      <Cell>
        <CenteredCell>
          <SwapButton>Swap</SwapButton>
        </CenteredCell>
      </Cell>
    </Row>
  );
};
