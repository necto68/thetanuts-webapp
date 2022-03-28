import { useWallet } from "@gimmixorg/use-wallet";

import { ChainSelect, WalletButton } from "../../wallet/components";

import { SwitchToV0Button } from "./SwitchToV0Button";
import {
  Container,
  ButtonsContainer,
  SwitchToV0ButtonContainer,
} from "./Header.styles";

export const Header = () => {
  const { network } = useWallet();

  return (
    <Container>
      <SwitchToV0ButtonContainer>
        <SwitchToV0Button secondaryColor="#031a34" />
      </SwitchToV0ButtonContainer>
      {network ? (
        <ButtonsContainer>
          <ChainSelect />
          <WalletButton />
        </ButtonsContainer>
      ) : (
        <WalletButton />
      )}
    </Container>
  );
};
