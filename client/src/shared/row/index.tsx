import React, { FC, ReactNode } from "react";
import { RowWrapper } from "./style";

interface RowProps {
  children?: ReactNode;
  stylerow?: string;
  gap?: string;
}
const Row: FC<RowProps> = ({ children, ...rest }) => {
  return <RowWrapper {...rest}>{children}</RowWrapper>;
};

export default Row;
