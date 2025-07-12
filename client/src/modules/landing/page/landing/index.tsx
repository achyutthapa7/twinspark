import React from "react";
import {
  StyleChildrenWrapper,
  StyleContentWrapper,
  StyleIllustrationWrapper,
  StyleLandingPage,
} from "./style";
import Topbar from "@/shared/layout/topbar";
import Typography from "@/shared/typography";
import Column from "@/shared/column";
import Row from "@/shared/row";
import Button from "@/shared/button";
import FeatureCard from "../../component/card/feature";

const LandingPage = () => {
  return (
    <StyleLandingPage>
      <Topbar />
      <StyleChildrenWrapper>
        <StyleContentWrapper style={{ flex: 1 }}>
          <Typography
            size="90px"
            weight="600"
            styletypography="width:500px;"
            lineheight={"1.2"}
            spacing="2.8px"
          >
            Meet, Chat & Laugh
          </Typography>
          <Column>
            <Typography size="32px" styletypography="width:500px;">
              Fun & easy way to make new friends instantly!
            </Typography>
            <Row>
              <Button title="Start Now" variant="fill" />
              <Button title="Explore" variant="" />
            </Row>
          </Column>
        </StyleContentWrapper>
        <StyleIllustrationWrapper>
          <img src="/illustration.png" alt="" />
        </StyleIllustrationWrapper>
      </StyleChildrenWrapper>
      <FeatureCard />
    </StyleLandingPage>
  );
};

export default LandingPage;
