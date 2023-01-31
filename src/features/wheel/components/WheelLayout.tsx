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

import { FeaturedWheelVaultsList } from "./FeaturedWheelVaultsList";
import { WheelVaultsTable } from "./WheelVaultsTable";

export const WheelLayout = () => {
  const isMobile = useIsMobile();

  const [isShowMoreDescription, setIsShowMoreDescription] = useState(false);

  const handleExpandDescriptionClick = useCallback(() => {
    setIsShowMoreDescription(!isShowMoreDescription);
  }, [isShowMoreDescription]);

  return (
    <Container>
      <ContentContainer>
        <DescriptionContainer>
          <Title>Wheel Vaults</Title>
          {isMobile && !isShowMoreDescription ? (
            <Description>
              The Thetanuts Wheel vaults earn yield by selling physically
              settled puts and calls.&nbsp;
              <ExpandDescriptionLink onClick={handleExpandDescriptionClick}>
                (show more)
              </ExpandDescriptionLink>
            </Description>
          ) : (
            <>
              <Description>
                The Thetanuts Wheel vaults earn yield by selling physically
                settled puts and calls. The goal of the wheel vaults is to sell
                puts to receive the underlying asset at discount & sell calls to
                sell the underlying asset at a higher price to generate overall
                profit. When the wheel vault is struck, it automatically changes
                from put-selling to covered call-selling and vice versa, which
                creates the &quot;Buy Low Sell High&quot; effect.
              </Description>
              <Description>
                Read the&nbsp;
                <DescriptionLink href={links.docs}>
                  Thetanuts Docs
                </DescriptionLink>
                &nbsp; for a more detailed overview of Thetanuts Wheel Vaults or
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
      <Title>Featured Wheel Vaults</Title>
      <FeaturedWheelVaultsList />
      <WheelVaultsTable />
    </Container>
  );
};
