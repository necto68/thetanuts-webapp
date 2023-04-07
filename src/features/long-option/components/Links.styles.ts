import styled from "styled-components";

import { ComponentContainer } from "./LongOptionContent.styles";

export const Container = styled(ComponentContainer)`
  flex-direction: column;
  gap: 16px;
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Link = styled.a.attrs({ target: "_blank" })`
  font-family: Roboto;
  font-size: 12px;
  color: #a6b0c7;
`;

export { InfoValue as Title } from "../../long-option-modal/components/OrderInfo.styles";
