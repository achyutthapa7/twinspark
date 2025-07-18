import React, { FC, Fragment } from "react";
import { StyleButton, StyleButtonWrapper } from "./style";

interface ButtonProps {
  type: "submit" | "reset" | "button";
  title: string;
  variant?: string;
  onClick?: <T>(val?: T) => void;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  title,
  variant,
  onClick,
  isLoading = false,
  ...rest
}) => {
  return (
    <StyleButtonWrapper>
      <StyleButton variant={variant} onClick={onClick} {...rest}>
        {isLoading ? "Loading" : <Fragment> {title}</Fragment>}
      </StyleButton>
    </StyleButtonWrapper>
  );
};

export default Button;
