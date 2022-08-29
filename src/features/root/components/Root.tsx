import { Route, Switch, Redirect } from "react-router-dom";

import { ThetaIndexPage } from "../../theta-index/components";
import { PortfolioPage } from "../../portfolio/components";
import { Modal, Backdrop } from "../../modal/components";
import { Sidebar } from "../../sidebar/components";
import { CurrentDateProvider } from "../../basic-vault/providers";
import { RouterPathname } from "../types";
import { useWalletAutoConnect } from "../hooks";
import { useIsTablet } from "../../shared/hooks";
import { useCurrentPagePathname } from "../hooks/useCurrentPagePathname";
import { useSidebarState } from "../../sidebar/hooks";

import { MobileHeader } from "./MobileHeader";
import {
  AnnouncementContainer,
  AnnouncementLink,
  AnnouncementTitle,
  BackgroundContainer,
  Container,
  GridContainer,
  LayoutContainer,
  MobileHeaderContainer,
  PageContainer,
  SidebarContainer,
} from "./Root.styles";

// TODO: return Basic vaults later
// import { BasicPage } from "../../basic/components";

export const Root = () => {
  const currentPagePathname = useCurrentPagePathname();
  const { isShow, toggleIsShow } = useSidebarState();
  const isTablet = useIsTablet();

  const closeSidebar = () => {
    if (isShow) {
      toggleIsShow();
    }
  };

  useWalletAutoConnect();

  return (
    <CurrentDateProvider>
      <Container>
        <BackgroundContainer pathname={currentPagePathname}>
          <Modal />
          {isShow && isTablet ? <Backdrop onClick={closeSidebar} /> : null}
          <LayoutContainer>
            <AnnouncementContainer>
              <AnnouncementTitle>
                Migration from Thetanuts v0 to Thetanuts Basic starting from
                02/09/2022.{" "}
                <AnnouncementLink
                  target="_blank"
                  to="https://thetanutsfinance.medium.com/thetanuts-basic-option-vault-migration-58a7c58898c4"
                >
                  Click here
                </AnnouncementLink>{" "}
                to read more.
              </AnnouncementTitle>
            </AnnouncementContainer>
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
                  {/* <Route
                    exact
                    path={[
                      RouterPathname.basic,
                      RouterPathname.basicVaultModal,
                    ]}
                  >
                    <BasicPage />
                  </Route> */}
                  <Route exact path={RouterPathname.portfolio}>
                    <PortfolioPage />
                  </Route>
                  <Route>
                    <Redirect to={RouterPathname.thetaIndex} />
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
