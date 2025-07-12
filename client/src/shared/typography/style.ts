import styled from "styled-components";

interface TypogrpahyProps {
  size?: string;
  color?: string;
  weight?: string;
  align?: "left" | "center" | "right" | "justify";
  styletypography?: string;
  lineheight?: string;
  spacing?: string;
}

export const StyleTypography = styled.p<TypogrpahyProps>`
  font-size: ${({ size }) => size || "1rem"};
  color: ${({ color, theme }: any) => color || theme.colors.text};
  text-align: ${({ align }) => align || "left"};
  font-weight: ${({ weight }) => weight || "normal"};
  margin: 0;
  line-height: ${({ lineheight }) => lineheight || 1.6};
  letter-spacing: ${({ spacing }) => spacing || "1.5px"};
  ${({ styletypography }) => styletypography};
`;
