import React from "react";
import { ActionButtonContainer, StyleLogo, StyleTopbarWrapper } from "./style";
import Button from "@/shared/button";

const Topbar = () => {
  return (
    <StyleTopbarWrapper>
      <StyleLogo>Twinspark</StyleLogo>
      <ActionButtonContainer>
        <Button title="Log in" />
        <Button title="Sign up" variant="fill" />
      </ActionButtonContainer>
    </StyleTopbarWrapper>
  );
};

export default Topbar;
