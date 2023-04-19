import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
`;

export const ToTitle = styled(Title)`
  font-size: 20px;
`;
