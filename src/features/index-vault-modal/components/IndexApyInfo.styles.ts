import styled from "styled-components";

import {
  Container as VaultInfoContainer,
  InfoTitle as VaultInfoTitle,
  InfoValue as VaultInfoValue,
  InfoLink as VaultInfoLink,
} from "./VaultInfo.styles";

export const Container = styled(VaultInfoContainer)`
  padding: 0 0 15px;
`;

export const InfoTitle = styled(VaultInfoTitle)`
  font-size: 10px;
`;

export const InfoValue = styled(VaultInfoValue)`
  font-size: 12px;
`;

export const InfoLink = styled(VaultInfoLink)`
  font-size: 12px;
`;
