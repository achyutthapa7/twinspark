import React from "react";
import { ActionButtonContainer, StyleLogo, StyleTopbarWrapper } from "./style";
import Button from "@/shared/button";
import { useRouter } from "next/navigation";

const Topbar = () => {
  const router = useRouter();
  return (
    <StyleTopbarWrapper>
      <StyleLogo>Twinspark</StyleLogo>
      <ActionButtonContainer>
        <Button title="Log in" onClick={() => router.push("/login")} />
        <Button title="Sign up" variant="fill" />
      </ActionButtonContainer>
    </StyleTopbarWrapper>
  );
};

export default Topbar;
