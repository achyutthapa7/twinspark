import theme from "@/utils/theme";
import styled from "styled-components";

export const StyleButtonWrapper = styled.div`
  width: auto;
  display: flex;
  justify-content: ${(props: any) => props.justify || "flex-start"};
  align-items: center;
`;

export const StyleButton = styled.button<{ variant?: string }>`
  width: 100%;
  width: auto;
  color: ${theme.colors.text};
  font-weight: 500;
  background-color: ${(props: any) =>
    props.variant === "fill" ? props.theme.colors.accent : ""};
  padding: 10px 26px;
  outline: none;
  border: none;
  border-radius: 10px;
  transition: all 250ms linear;
  cursor: pointer;
  &:hover {
    background-color: ${(props: any) =>
      props.variant === "fill" ? "transparent" : props.theme.colors.accent};

    scale: 1.09;
  }
  &:active {
    background-color: ${(props: any) =>
      props.variant === "fill" ? "transparent" : props.theme.colors.accent};

    scale: 0.98;
  }
`;
