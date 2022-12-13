import { useCallback, useState } from "react";

import { links } from "../../shared/constants";
import { useIsMobile } from "../../shared/hooks";
import {
  ContentContainer,
  DescriptionContainer,
  Description,
  DescriptionLink,
  ExpandDescriptionLink,
} from "../../theta-index/components/ThetaIndexLayout.styles";

import { Container, Title } from "./DegenLayout.styles";
import { FeaturedDegenVaultsList } from "./FeaturedDegenVaultsList";
import { DegenVaultsTable } from "./DegenVaultsTable";

export const DegenLayout = () => {
  const isMobile = useIsMobile();

  const [isShowMoreDescription, setIsShowMoreDescription] = useState(false);

  const handleExpandDescriptionClick = useCallback(() => {
    setIsShowMoreDescription(!isShowMoreDescription);
  }, [isShowMoreDescription]);

  return (
    <Container>
      <ContentContainer>
        <DescriptionContainer>
          <Title>Degen Vaults (High Risk)</Title>
          {isMobile && !isShowMoreDescription ? (
            <Description>
              Degen Vault earns a high yield by selling automated spreads to
              market makers. The current weekly yield is extrapolated into the
              current projected APY% so that users have a better understanding
              of the vault&apos;s risk-reward profile.&nbsp;
              <ExpandDescriptionLink onClick={handleExpandDescriptionClick}>
                (show more)
              </ExpandDescriptionLink>
            </Description>
          ) : (
            <>
              <Description>
                Degen Vault earns a high yield by selling automated spreads to
                market makers. The current weekly yield is extrapolated into the
                current projected APY% so that users have a better understanding
                of the vault&apos;s risk-reward profile. The yield generated is
                in the form of the underlying asset deposited. In an event that
                the degen vault expires ITM, users would still earn option
                premiums but they would lose their initial deposit. Use with
                caution.
              </Description>
              <Description>
                Read the&nbsp;
                <DescriptionLink href={links.docs}>
                  Thetanuts Docs
                </DescriptionLink>
                &nbsp; for a more detailed overview of Thetanuts Degen Vaults or
                contact us on&nbsp;
                <DescriptionLink href={links.discord}>
                  Thetanuts Discord
                </DescriptionLink>
                .
              </Description>
              {isMobile ? (
                <ExpandDescriptionLink onClick={handleExpandDescriptionClick}>
                  (show less)
                </ExpandDescriptionLink>
              ) : null}
            </>
          )}
        </DescriptionContainer>
      </ContentContainer>
      <Title>Featured Degen Vaults</Title>
      <FeaturedDegenVaultsList />
      <DegenVaultsTable />
    </Container>
  );
};
