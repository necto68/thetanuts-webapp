import styled from "styled-components";

import { screens } from "../../shared/constants";
import { Container as ThetaIndexLayoutContainer } from "../../theta-index/components/ThetaIndexLayout.styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TitleContainer = styled(ThetaIndexLayoutContainer)`
  gap: 10px;

  padding: 25px 25px 0 25px;

  ${screens.md} {
    padding: 15px 15px 0 15px;
  }
`;

export {
  Title,
  Description,
} from "../../theta-index/components/ThetaIndexLayout.styles";
