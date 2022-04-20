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
  ItalicDescription,
  DescriptionLink,
  ExpandDescriptionLink,
} from "./ThetaIndexLayout.styles";

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
          <Title>Stronghold</Title>
          {isMobile && !isShowMoreDescription ? (
            <Description>
              Stronghold earns yields by running an automated index of options
              strategies. Earnings are auto-compounded.{" "}
              <ExpandDescriptionLink onClick={handleExpandDescriptionClick}>
                (show more)
              </ExpandDescriptionLink>
            </Description>
          ) : (
            <>
              <Description>
                Stronghold earns yields by running an automated index of options
                strategies. Earnings are auto-compounded. When you swap your
                assets, you will receive a Stronghold token representing your
                pro-rata ownership of that Stronghold. The strike prices and
                expirations of each strategy within the Stronghold are
                algorithmically determined to generate the highest risk adjusted
                yield. You can swap between your assets and Stronghold tokens
                anytime at the market rate. Thetanuts does not collect any
                performance fees.
              </Description>
              <ItalicDescription>
                Read the{" "}
                <DescriptionLink href="https://docs.thetanuts.finance">
                  Thetanuts Docs
                </DescriptionLink>{" "}
                for a more detailed overview of Thetanuts Stronghold or contact
                us on{" "}
                <DescriptionLink href="https://discord.com/invite/fzWKJSy9v9">
                  Thetanuts Discord
                </DescriptionLink>
                .
              </ItalicDescription>
              {isMobile ? (
                <ExpandDescriptionLink onClick={handleExpandDescriptionClick}>
                  (show less)
                </ExpandDescriptionLink>
              ) : null}
            </>
          )}
        </DescriptionContainer>
        <BasketIconContainer>
          <IconContainer height={195} width={184}>
            <Basket />
          </IconContainer>
        </BasketIconContainer>
      </ContentContainer>
      <Title>Featured Strongholds</Title>
      <FeaturedIndexVaultsList />
      <IndexVaultsTable />
    </Container>
  );
};
