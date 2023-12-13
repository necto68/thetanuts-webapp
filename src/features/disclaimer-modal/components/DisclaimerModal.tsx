import { useCallback } from "react";

import { BaseButton } from "../../shared/components";
import { useDisclaimerModalState } from "../hooks";

import {
  Container,
  Title,
  UnorderedList,
  ListItem,
  Subtitle,
  Link,
  ActionContainer,
} from "./DisclaimerModal.styles";

export const DisclaimerModal = () => {
  const [, setDisclaimerModalState] = useDisclaimerModalState();

  const handleCloseButtonClick = useCallback(() => {
    setDisclaimerModalState({ isShow: false });
  }, [setDisclaimerModalState]);

  return (
    <Container>
      <Title>Terms of Service Agreement</Title>
      <Subtitle>
        Thetanuts Finance is a decentralized, non-custodial options protocol. By
        accessing Thetanuts Finance website, you agree to the {" "}
        <Link href="https://docs.thetanuts.finance/other-information/terms-of-service">
          Terms of Service
        </Link>
        .
      </Subtitle>
      <UnorderedList>
        <ListItem>
          I am not a person or entity who resides in, are citizens of, are
          incorporated in, or have a registered office in the United States or
          any Restricted Territory, as defined in the Terms of Service.
        </ListItem>
        <ListItem>
          I will not in the future access this site or use the Thetanuts Finance
          protocol while located within the United States or any Restricted
          Territory, as defined in the Terms of Service.
        </ListItem>
        <ListItem>
          I am lawfully permitted to access this site and use the Thetanuts
          Finance protocol under the laws of the jurisdiction on which I reside
          and am located.
        </ListItem>
        <ListItem>
          I understand the risks associated with entering into and using the
          Thetanuts Finance protocol.
        </ListItem>
      </UnorderedList>
      <ActionContainer>
        <BaseButton
          onClick={handleCloseButtonClick}
          primaryColor="#1FFFAB"
          secondaryColor="#1A1D23"
          title="Agree and Proceed"
        >
          Agree and Proceed
        </BaseButton>
      </ActionContainer>
    </Container>
  );
};
