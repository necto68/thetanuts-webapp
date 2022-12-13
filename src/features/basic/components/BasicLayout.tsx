import { useCallback, useState } from "react";

import { links } from "../../shared/constants";
import { useIsMobile } from "../../shared/hooks";
import {
  Container,
  ContentContainer,
  DescriptionContainer,
  Title,
  Description,
  DescriptionLink,
  ExpandDescriptionLink,
} from "../../theta-index/components/ThetaIndexLayout.styles";

import { FeaturedBasicVaultsList } from "./FeaturedBasicVaultsList";
import { BasicVaultsTable } from "./BasicVaultsTable";

export const BasicLayout = () => {
  const isMobile = useIsMobile();

  const [isShowMoreDescription, setIsShowMoreDescription] = useState(false);

  const handleExpandDescriptionClick = useCallback(() => {
    setIsShowMoreDescription(!isShowMoreDescription);
  }, [isShowMoreDescription]);

  return (
    <Container>
      <ContentContainer>
        <DescriptionContainer>
          <Title>Basic Vaults</Title>
          {isMobile && !isShowMoreDescription ? (
            <Description>
              Basic Vaults earn yield by selling automated option strategies to
              market makers. Earnings are auto-compounded.&nbsp;
              <ExpandDescriptionLink onClick={handleExpandDescriptionClick}>
                (show more)
              </ExpandDescriptionLink>
            </Description>
          ) : (
            <>
              <Description>
                Basic Vaults earn yield by selling automated option strategies
                to market makers. Earnings are auto-compounded. The yield
                generated is in the form of the underlying asset. Users can
                accumulate more underlying assets through covered calls or farm
                stablecoins through put selling. The strike price and expiration
                of each basic strategy are algorithmically determined to
                generate the highest risk-adjusted yield. Thetanuts does not
                collect any form of fees on the basic vaults.
              </Description>
              <Description>
                Read the&nbsp;
                <DescriptionLink href={links.docs}>
                  Thetanuts Docs
                </DescriptionLink>
                &nbsp; for a more detailed overview of Thetanuts Basic Vaults or
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
      <Title>Featured Basic Vaults</Title>
      <FeaturedBasicVaultsList />
      <BasicVaultsTable />
    </Container>
  );
};
