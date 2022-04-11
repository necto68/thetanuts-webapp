import { useCallback, useState } from "react";

import { IconContainer } from "../../shared/components";
import { useIsMobile } from "../../shared/hooks";
import { Basket } from "../icons";

import { FeaturedIndexVaultsList } from "./FeaturedIndexVaultsList";
import { IndexVaultsTable } from "./IndexVaultsTable";
import {
  Container,
  ContentContainer,
  DescriptionContainer,
  BasketIconContainer,
  Title,
  Description,
  DescriptionLink,
  ExpandDescriptionLink,
} from "./ThateIndexLayout.styles";

export const ThetaIndexLayout = () => {
  const isMobile = useIsMobile();

  const [isShowMoreDescription, setIsShowMoreDescription] = useState(false);

  const handleExpandDescriptionClick = useCallback(() => {
    setIsShowMoreDescription(!isShowMoreDescription);
  }, [isShowMoreDescription]);

  return (
    <Container>
      <ContentContainer>
        <DescriptionContainer>
          <Title>Theta-Index</Title>
          {isMobile && !isShowMoreDescription ? (
            <Description>
              Theta-Index earns yields by running an automated basket of options
              strategies. Earnings are auto-compounded.{" "}
              <ExpandDescriptionLink onClick={handleExpandDescriptionClick}>
                (show more)
              </ExpandDescriptionLink>
            </Description>
          ) : (
            <>
              <Description>
                Theta-Index earns yields by running an automated basket of
                options strategies. Earnings are auto-compounded. When you swap
                your assets, you will receive a Theta-Index token representing
                your pro-rata ownership of that Theta-Index. The strike prices
                and expirations of each strategy within the index are
                algorithmically determined to generate the highest risk adjusted
                yield. You can swap between your assets and Theta-Index tokens
                anytime at the market rate. Thetanuts does not collect any
                performance fees.
              </Description>
              <Description>
                Read the{" "}
                <DescriptionLink href="https://docs.thetanuts.finance">
                  Thetanuts Docs
                </DescriptionLink>{" "}
                for a more detailed overview of Thetanuts Theta-Index or contact
                us on{" "}
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
          <IconContainer height={190} width={163}>
            <Basket />
          </IconContainer>
        </BasketIconContainer>
      </ContentContainer>
      <Title>Featured Theta-Index Vaults</Title>
      <FeaturedIndexVaultsList />
      <IndexVaultsTable />
    </Container>
  );
};
