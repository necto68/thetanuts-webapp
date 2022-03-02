import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  background-color: rgba(1, 12, 26, 0.7);
  border-radius: 10px;
`;

export {
  Title,
  Container as TitleContainer,
} from "../../theta-index/components/ThateIndexLayout.styles";
