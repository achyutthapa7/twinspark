import React, { FC } from "react";
import { StyleButton, StyleButtonWrapper } from "./style";

interface ButtonProps {
  title: string;
  variant?: string;
}

const Button: FC<ButtonProps> = ({ title, variant }) => {
  return (
    <StyleButtonWrapper>
      <StyleButton variant={variant}>{title}</StyleButton>
    </StyleButtonWrapper>
  );
};

export default Button;
