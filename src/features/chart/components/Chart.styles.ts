import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  & > #tradingview_widget_wrapper {
    width: 100%;
  }

  & > #tradingview_widget_wrapper > div:nth-child(2) {
    display: none;
  }
`;
