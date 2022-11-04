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

import { LendingMarketVaultsTable } from "./LendingMarketVaultsTable";

// TODO: return later
// import { CollateralAssetsTable } from "./CollateralAssetsTable";

export const LendingMarketLayout = () => {
  const isMobile = useIsMobile();

  const [isShowMoreDescription, setIsShowMoreDescription] = useState(false);

  const handleExpandDescriptionClick = useCallback(() => {
    setIsShowMoreDescription(!isShowMoreDescription);
  }, [isShowMoreDescription]);

  return (
    <Container>
      <ContentContainer>
        <DescriptionContainer>
          <Title>Long</Title>
          {isMobile && !isShowMoreDescription ? (
            <Description>
              Long vaults allows users to long the various sold options that
              Thetanuts provides. Each deposit is leveraged and users would pay
              a weekly premium to retain their respective long
              position(s).&nbsp;
              <ExpandDescriptionLink onClick={handleExpandDescriptionClick}>
                (show more)
              </ExpandDescriptionLink>
            </Description>
          ) : (
            <>
              <Description>
                Long vaults allows users to long the various sold options that
                Thetanuts provides. Each deposit is leveraged and users would
                pay a weekly premium to retain their respective long
                position(s). The settlement of each long vault is in the form of
                the underlying asset. The strike price and expiration of the
                option vaults are algorithmically determined to generate the
                highest risk-adjusted yield. Thetanuts does not collect any form
                of fees on the long vaults.
              </Description>
              <Description>
                Read the&nbsp;
                <DescriptionLink href={links.docs}>
                  Thetanuts Docs
                </DescriptionLink>
                &nbsp; for a more detailed overview of Thetanuts Long Vaults or
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
      {/* <Title>Position Manager</Title>
      <CollateralAssetsTable /> */}
      <LendingMarketVaultsTable />
    </Container>
  );
};
