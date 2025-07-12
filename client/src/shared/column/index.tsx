import React, { FC, ReactNode } from "react";
import { ColumnWrapper } from "./style";
interface ColumnProps {
  children?: ReactNode;
  gap?: string;
  stylecolumn?: string;
}
const Column: FC<ColumnProps> = ({ children, ...rest }) => {
  return <ColumnWrapper {...rest}>{children}</ColumnWrapper>;
};

export default Column;
