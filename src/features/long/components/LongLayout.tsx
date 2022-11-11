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

import { LongVaultsTable } from "./LongVaultsTable";

// TODO: return later
// import { CollateralAssetsTable } from "./CollateralAssetsTable";

export const LongLayout = () => {
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
              Thetanuts provides. Each long position requires 10% collateral
              from users. Users would pay the option premium to retain their
              long postion(s).&nbsp;
              <ExpandDescriptionLink onClick={handleExpandDescriptionClick}>
                (show more)
              </ExpandDescriptionLink>
            </Description>
          ) : (
            <>
              <Description>
                Long vaults allows users to long the various sold options that
                Thetanuts provides. Each long position requires 10% collateral
                from users. Users would pay the option premium to retain their
                long postion(s). The option premiums payable corresponds to the
                winning bid from market makers. The settlement of each long
                vault is in the form of the underlying asset. The strike and
                expiration of each option vault are algorithmically determined
                to generate the highest risk-adjusted yield. Thetanuts charges a
                fixed 2% APR borrowing fee on users to maintain their long
                positions.
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
      <LongVaultsTable />
    </Container>
  );
};
