import styled from "styled-components";

import {
  InfoValue as VaultInfoValue,
  Container as VaultInfoContainer,
} from "./VaultInfo.styles";

export const Container = styled(VaultInfoContainer)`
  padding: 0 0 15px;
`;

export const InfoValue = styled(VaultInfoValue)`
  font-size: 14px;
`;
