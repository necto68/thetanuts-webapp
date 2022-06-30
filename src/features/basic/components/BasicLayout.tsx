import { useCallback, useState } from "react";

import { IconContainer } from "../../shared/components";
import { useScreens } from "../../shared/hooks";
import {
  Container,
  ContentContainer,
  DescriptionContainer,
  BasketIconContainer,
  Title,
  Description,
  DescriptionLink,
  ExpandDescriptionLink,
} from "../../theta-index/components/ThetaIndexLayout.styles";
import { PotPlant } from "../icons";

import { FeaturedBasicVaultsList } from "./FeaturedBasicVaultsList";
import { BasicVaultsTable } from "./BasicVaultsTable";

export const BasicLayout = () => {
  const isMobile = useScreens();

  const [isShowMoreDescription, setIsShowMoreDescription] = useState(false);

  const handleExpandDescriptionClick = useCallback(() => {
    setIsShowMoreDescription(!isShowMoreDescription);
  }, [isShowMoreDescription]);

  return (
    <Container>
      <ContentContainer>
        <DescriptionContainer>
          <Title>Basic</Title>
          {isMobile && !isShowMoreDescription ? (
            <Description>
              Basic vaults earn yield by selling automated option strategies to
              market makers. Earnings are auto-compounded.{" "}
              <ExpandDescriptionLink onClick={handleExpandDescriptionClick}>
                (show more)
              </ExpandDescriptionLink>
            </Description>
          ) : (
            <>
              <Description>
                Basic vaults earn yield by selling automated option strategies
                to market makers. Earnings are auto-compounded. The yield
                generated is in the form of the underlying asset. Users can
                accumulate more underlying assets through covered calls or farm
                stablecoins through put selling. The strike price and expiration
                of each basic strategy are algorithmically determined to
                generate the highest risk-adjusted yield. Thetanuts does not
                collect any form of fees on the basic vaults.
              </Description>
              <Description>
                Read the{" "}
                <DescriptionLink href="https://docs.thetanuts.finance">
                  Thetanuts Docs
                </DescriptionLink>{" "}
                for a more detailed overview of Thetanuts Basic Vaults or
                contact us on{" "}
                <DescriptionLink href="https://discord.com/invite/fzWKJSy9v9">
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
        <BasketIconContainer>
          <IconContainer height={225} width={195}>
            <PotPlant />
          </IconContainer>
        </BasketIconContainer>
      </ContentContainer>
      <Title>Featured Basic</Title>
      <FeaturedBasicVaultsList />
      <BasicVaultsTable />
    </Container>
  );
};
