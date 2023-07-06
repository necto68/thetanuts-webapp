import { useWallet } from "../../wallet/hooks";
import { chainsMap } from "../../wallet/constants";

import { Container } from "./FeaturedIndexVaultsList.styles";
import { Description } from "./ThetaIndexLayout.styles";

export const EmptyFeaturedVaultsList = () => {
  const { walletChainId } = useWallet();

  const chainTitle = chainsMap[walletChainId].title;

  return (
    <Container>
      <Description>No Vaults on {chainTitle} network</Description>
    </Container>
  );
};
