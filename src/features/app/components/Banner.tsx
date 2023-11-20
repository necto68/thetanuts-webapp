import { BannerContainer, BannerText, BannerLink } from "./App.styles";

export const Banner = () => (
  <BannerContainer>
    <BannerText>
      You are accessing Thetanuts Finance's legacy v2 products. Find out more
      about the
      <BannerLink
        href="https://thetanutsfinance.medium.com/thetanuts-finance-announcing-the-v3-upgrade-42875cb7a13b"
        target="_blank"
      >
        Thetanuts Finance v3 upgrade
      </BannerLink>
      , and access our upgraded v3 interface{" "}
      <BannerLink href="https://app.thetanuts.finance/" target="_blank">
        here
      </BannerLink>
      .
    </BannerText>
  </BannerContainer>
);
