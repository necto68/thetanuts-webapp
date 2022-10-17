import styled from "styled-components";

import {
  InfoTitle,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";

interface InfoTitleProps {
  isSimulated: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SimulatedInfoTitle = styled(InfoTitle)<InfoTitleProps>`
  color: ${({ isSimulated }) => (isSimulated ? "#eb5353" : "#ffffff")};
`;

export const SimulatedInfoValue = styled(InfoValue)<InfoTitleProps>`
  color: ${({ isSimulated }) => (isSimulated ? "#eb5353" : "#ffffff")};
`;
