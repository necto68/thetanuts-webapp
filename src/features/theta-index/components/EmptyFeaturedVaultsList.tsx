import { useConnectWallet } from "@web3-onboard/react";

import type { ChainId } from "../../wallet/constants";
import { chainsMap } from "../../wallet/constants";

import { Container } from "./FeaturedIndexVaultsList.styles";
import { Description } from "./ThetaIndexLayout.styles";

export const EmptyFeaturedVaultsList = () => {
  const [{ wallet }] = useConnectWallet();
  const currentChainId = parseInt(wallet?.chains?.[0]?.id ?? "0", 16);
  
  const chainId: ChainId | undefined = currentChainId;

  const chainTitle = chainId ? chainsMap[chainId].title : null;

  return (
    <Container>
      <Description>No Vaults on {chainTitle} network</Description>
    </Container>
  );
};
