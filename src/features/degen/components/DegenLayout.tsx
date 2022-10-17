import { useCallback, useState } from "react";

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
          <Title>Degen (High Risk)</Title>
          {isMobile && !isShowMoreDescription ? (
            <Description>
              In contrast to Thetanuts Basic Vaults that sells back-tested low
              risk options to market makers, the new Thetanuts Degen Vaults
              features exotic option strategies.&nbsp;
              <ExpandDescriptionLink onClick={handleExpandDescriptionClick}>
                (show more)
              </ExpandDescriptionLink>
            </Description>
          ) : (
            <>
              <Description>
                In contrast to Thetanuts Basic Vaults that sells back-tested low
                risk options to market makers, the new Thetanuts Degen Vaults
                features exotic option strategies. Degen Vaults include
                strategies with much higher reward, but it also carries higher
                risk. In case that the Degen Vault expires ITM, depositors will
                still earn the premium, however they will lose their initial
                deposit.
              </Description>
              <Description>
                Read the&nbsp;
                <DescriptionLink href="https://docs.thetanuts.finance">
                  Thetanuts Docs
                </DescriptionLink>
                &nbsp; for a more detailed overview of Thetanuts Degen Vaults or
                contact us on&nbsp;
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
      </ContentContainer>
      <Title>Featured Degen</Title>
      <FeaturedDegenVaultsList />
      <DegenVaultsTable />
    </Container>
  );
};
