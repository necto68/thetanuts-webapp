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
        By using Thetanuts dApp, I agree to the{" "}
        <Link href="https://thetanuts.finance/basic/disclaimer" target="_blank">
          Important Disclaimer
        </Link>
        &nbsp; the{" "}
        <Link href="https://thetanuts.finance/basic/termscondition">
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link href="https://thetanuts.finance/basic/privacypolicy">
          Privacy Policy
        </Link>
        .
      </Subtitle>
      <UnorderedList>
        <ListItem>
          I am not a person or entity who resides in, are citizens of, are
          incorporated in , or have a registered office in the USA or any
          Prohibited Jurisdictions, as defined in the Terms of Use
        </ListItem>
        <ListItem>
          I will not in the future access this site or use the Thetanuts dApp
          while located within the United States or any Prohibited
          Jurisdictions, as defined in the Terms of Use
        </ListItem>
        <ListItem>
          I am lawfully permitted to access this site and use the Thetanuts dApp
          under the laws of the jurisdiction on which I reside and am located
        </ListItem>
        <ListItem>
          I understand the risks associated with entering into and using
          Thetanuts Finance protocols
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
