import { useCallback } from "react";

import { GradientButton } from "../../shared/components";
import { useDisclaimerModalState } from "../hooks";

import {
  Container,
  Title,
  UnorderedList,
  ListItem,
} from "./DisclaimerModal.styles";

export const DisclaimerModal = () => {
  const [, setDisclaimerModalState] = useDisclaimerModalState();

  const handleCloseButtonClick = useCallback(() => {
    setDisclaimerModalState({ isShow: false });
  }, [setDisclaimerModalState]);

  return (
    <Container>
      <Title>
        By using Thetanuts dApp, I agree to the (1) Important Disclaimer; (2)
        the Terms of Use; and (3) Privacy Policy.
      </Title>
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
      <GradientButton
        backgroundColor="#283841"
        onClick={handleCloseButtonClick}
        title="Agree and Proceed"
      />
    </Container>
  );
};
