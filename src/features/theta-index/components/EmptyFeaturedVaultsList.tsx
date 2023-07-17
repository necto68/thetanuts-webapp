import { useWallet } from "../../wallet/hooks/useWallet";
import type { ChainId } from "../../wallet/constants";
import { chainsMap } from "../../wallet/constants";

import { Container } from "./FeaturedIndexVaultsList.styles";
import { Description } from "./ThetaIndexLayout.styles";

export const EmptyFeaturedVaultsList = () => {
  const { walletChainId } = useWallet();

  const chainId: ChainId | undefined = walletChainId;

  const chainTitle = chainsMap[chainId].title;

  return (
    <Container>
      <Description>No Vaults on {chainTitle} network</Description>
    </Container>
  );
};
