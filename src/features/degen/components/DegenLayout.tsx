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
              Degen vaults allow users with higher risk appetites to take on
              directional bets on the market and earn higher returns through
              advanced strategies such as option spreads.&nbsp;
              <ExpandDescriptionLink onClick={handleExpandDescriptionClick}>
                (show more)
              </ExpandDescriptionLink>
            </Description>
          ) : (
            <>
              <Description>
                Degen vaults allow users with higher risk appetites to take on
                directional bets on the market and earn higher returns through
                advanced strategies such as option spreads. Users of
                Thetanut&apos;s degen vaults would only need to post collateral
                which is leveraged to collateralize the range between the option
                spread(s). This promotes capital efficiency as users can
                implicitly choose their leverage by depositing part, or all
                their assets into the vault.
              </Description>
              <Description>
                The main risk is that users can lose part or all of their posted
                collateral as the spot price of the underlying asset approaches
                the long call/put option. As such we recommend users to read
                the&nbsp;
                <DescriptionLink href={links.docs}>
                  Thetanuts Docs
                </DescriptionLink>
                &nbsp; for a more detailed overview of Thetanuts Degen Vaults or
                contact us on&nbsp;
                <DescriptionLink href={links.discord}>
                  Thetanuts Discord
                </DescriptionLink>
                &nbsp;to clarify any concerns.
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
