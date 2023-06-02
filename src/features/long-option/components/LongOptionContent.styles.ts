import styled from "styled-components";

import { screens } from "../../shared/constants";

export const ComponentContainer = styled.div`
  display: flex;
  padding: 16px;
  border: 1px solid #323844;
  border-radius: 4px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AssetChartColumnContainer = styled(Container)`
  flex: 1;
`;

export const Content = styled.div`
  display: flex;
  gap: 8px;

  ${screens.md} {
    flex-direction: column;
  }
`;
