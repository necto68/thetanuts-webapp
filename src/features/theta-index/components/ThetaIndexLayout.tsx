import { IconContainer } from "../../shared/components";
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
} from "./ThateIndexLayout.styles";

export const ThetaIndexLayout = () => (
  <Container>
    <ContentContainer>
      <DescriptionContainer>
        <Title>Theta-Index</Title>
        <Description>
          A Theta-Index earns yield by running an automated portfolio of either
          covered call or put-selling strategies. When you swap in your assets,
          you will receive a tokenized version of your asset which represents
          your pro-rata ownership of that Theta-Index. Your swapped assets are
          auto-compounded. The option strikes and expirations of each covered
          call or put selling strategy is algorithmically determined to maximize
          yield while reducing the risks of having the options exercised. You
          can swap in and out anytime & Thetanuts does not collect any fees.
        </Description>
        <Description>
          For a more detailed understanding of how a Theta-Index work, read the
          Thetanuts Docs. If you have any other questions, feel free to post
          them on Thetanuts Discord.
        </Description>
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
