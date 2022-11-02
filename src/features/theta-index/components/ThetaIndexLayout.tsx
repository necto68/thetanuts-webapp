import { useCallback, useState } from "react";

import { links } from "../../shared/constants";
import { useIsMobile } from "../../shared/hooks";

import { FeaturedIndexVaultsList } from "./FeaturedIndexVaultsList";
import { IndexVaultsTable } from "./IndexVaultsTable";
import {
  Container,
  ContentContainer,
  DescriptionContainer,
  Title,
  Description,
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
              Stronghold earns yields by selling an automated index of options
              strategies to market makers. Earnings are auto-compounded.{" "}
              <ExpandDescriptionLink onClick={handleExpandDescriptionClick}>
                (show more)
              </ExpandDescriptionLink>
            </Description>
          ) : (
            <>
              <Description>
                Stronghold earns yields by selling an automated index of options
                strategies to market makers. Earnings are auto-compounded. When
                you swap your assets, you will receive a Stronghold token
                representing your pro-rata ownership of that Stronghold. The
                strike prices and expirations of each strategy within the
                Stronghold are algorithmically determined to generate the
                highest risk-adjusted yield. You can swap between your assets
                and Stronghold tokens anytime at the swap rate given. Thetanuts
                does not collect any performance or management fees.
              </Description>
              <Description>
                Read the{" "}
                <DescriptionLink href={links.docs}>
                  Thetanuts Docs
                </DescriptionLink>{" "}
                for a more detailed overview of Thetanuts Stronghold or contact
                us on{" "}
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
      <Title>Featured Strongholds</Title>
      <FeaturedIndexVaultsList />
      <IndexVaultsTable />
    </Container>
  );
};
