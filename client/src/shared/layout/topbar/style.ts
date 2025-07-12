import theme from "@/utils/theme";
import styled from "styled-components";

export const StyleTopbarWrapper = styled.div`
  background-color: transparent;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 80px;
`;

export const StyleLogo = styled.p`
  font-weight: 500;
  font-size: 40px;
  color: ${theme.colors.text};
`;

export const ActionButtonContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 24px;
`;
