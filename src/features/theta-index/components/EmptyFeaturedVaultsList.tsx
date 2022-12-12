import { useWallet } from "@gimmixorg/use-wallet";

import type { ChainId } from "../../wallet/constants";
import { chainsMap } from "../../wallet/constants";

import { Container } from "./FeaturedIndexVaultsList.styles";
import { Description } from "./ThetaIndexLayout.styles";

export const EmptyFeaturedVaultsList = () => {
  const { network } = useWallet();
  const chainId: ChainId | undefined = network?.chainId;

  const chainTitle = chainId ? chainsMap[chainId].title : null;

  return (
    <Container>
      <Description>No Vaults on {chainTitle} network</Description>
    </Container>
  );
};
