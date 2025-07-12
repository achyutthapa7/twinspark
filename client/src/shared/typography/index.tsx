import React, { FC, ReactNode } from "react";
import { StyleTypography } from "./style";

interface TypographyProps {
  children: ReactNode;
  size?: string;
  color?: string;
  align?: "left" | "center" | "right" | "justify";
  styletypography?: string;
  weight?: string;
  lineheight?: string;
  spacing?: string;
}
const Typography: FC<TypographyProps> = ({ children, ...rest }) => {
  return <StyleTypography {...rest}>{children}</StyleTypography>;
};

export default Typography;
