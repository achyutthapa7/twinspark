// "use client";
import theme from "@/utils/theme";
import styled from "styled-components";

export const StyleTopbarWrapper = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 80px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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
