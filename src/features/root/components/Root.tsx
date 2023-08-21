/* eslint-disable etc/no-commented-out-code */
import { Route, Switch, Redirect } from "react-router-dom";

import { ThetaIndexPage } from "../../theta-index/components";
import { BasicPage } from "../../basic/components";
import { DegenPage } from "../../degen/components";
import { WheelPage } from "../../wheel/components";
import { LongPage } from "../../long/components";
import { PortfolioPage } from "../../portfolio/components";
import { Modal, Backdrop } from "../../modal/components";
import { Sidebar } from "../../sidebar/components";
import { CurrentDateProvider } from "../../basic-vault/providers";
import { RouterPathname } from "../types";
import { useIsTablet } from "../../shared/hooks";
import { useSidebarState } from "../../sidebar/hooks";

import { MobileHeader } from "./MobileHeader";
import {
  BackgroundContainer,
  Container,
  GridContainer,
  LayoutContainer,
  MobileHeaderContainer,
  PageContainer,
  SidebarContainer,
} from "./Root.styles";

// TODO: use when need announcement
// import {
//   AnnouncementContainer,
//   AnnouncementLink,
//   AnnouncementTitle,
// } from "./Root.styles";

// TODO: uncomment when ready to deploy long trade
// import {
//   LongOptionPage,
//   LongOptionRedirect,
// } from "../../long-option/components";

export const Root = () => {
  const { isShow, toggleIsShow } = useSidebarState();
  const isTablet = useIsTablet();

  const closeSidebar = () => {
    if (isShow) {
      toggleIsShow();
    }
  };

  return (
    <CurrentDateProvider>
      <Container>
        <BackgroundContainer>
          <Modal />
          {isShow && isTablet ? <Backdrop onClick={closeSidebar} /> : null}
          <LayoutContainer>
            {/* <AnnouncementContainer>
              <AnnouncementTitle>
                TITLE
                <AnnouncementLink target="_blank" to="">
                  LINK
                </AnnouncementLink>
              </AnnouncementTitle>
            </AnnouncementContainer> */}
            <GridContainer>
              <SidebarContainer>
                <Sidebar />
              </SidebarContainer>
              <MobileHeaderContainer>
                <MobileHeader />
              </MobileHeaderContainer>
              <PageContainer>
                <Switch>
                  <Route
                    exact
                    path={[
                      RouterPathname.thetaIndex,
                      RouterPathname.indexVaultModal,
                    ]}
                  >
                    <ThetaIndexPage />
                  </Route>
                  <Route
                    exact
                    path={[
                      RouterPathname.basic,
                      RouterPathname.basicVaultModal,
                    ]}
                  >
                    <BasicPage />
                  </Route>
                  <Route
                    exact
                    path={[
                      RouterPathname.degen,
                      RouterPathname.degenVaultModal,
                    ]}
                  >
                    <DegenPage />
                  </Route>
                  <Route
                    exact
                    path={[
                      RouterPathname.wheel,
                      RouterPathname.wheelVaultModal,
                    ]}
                  >
                    <WheelPage />
                  </Route>
                  <Route
                    exact
                    path={[RouterPathname.long, RouterPathname.longVaultModal]}
                  >
                    <LongPage />
                  </Route>
                  {/* TODO: uncomment when ready to deploy long trade */}
                  {/* <Route exact path={[RouterPathname.longTrade]}> */}
                  {/*  <LongOptionRedirect /> */}
                  {/* </Route> */}
                  {/* <Route exact path={[RouterPathname.longTradeVaultModal]}> */}
                  {/*  <LongOptionPage /> */}
                  {/* </Route> */}
                  <Route exact path={RouterPathname.portfolio}>
                    <PortfolioPage />
                  </Route>
                  <Route>
                    <Redirect to={RouterPathname.basic} />
                  </Route>
                </Switch>
              </PageContainer>
            </GridContainer>
          </LayoutContainer>
        </BackgroundContainer>
      </Container>
    </CurrentDateProvider>
  );
};
