import type { FC } from "react";
import { useCallback } from "react";
import type { Web3Provider } from "@ethersproject/providers";

import { switchToChain } from "../../wallet/helpers";
import { ModalMainButton } from "../../modal/components/ModalMainButton.styles";
import type { ChainId } from "../../wallet/constants";
import { chainsMap } from "../../wallet/constants";

interface SwitchToChainIdMainButtonProps {
  chainId: ChainId;
  provider?: Web3Provider;
}

export const SwitchToChainIdMainButton: FC<SwitchToChainIdMainButtonProps> = ({
  chainId,
  provider,
}) => {
  const handleClick = useCallback(() => {
    void switchToChain(chainId, provider);
  }, [chainId, provider]);

  const chainTitle = chainsMap[chainId].title;

  return (
    <ModalMainButton
      onClick={handleClick}
      primaryColor="#259DDF"
      secondaryColor="#ffffff"
    >
      {`Switch to ${chainTitle} network`}
    </ModalMainButton>
  );
};
