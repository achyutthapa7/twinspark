import React, { FC } from "react";
import {
  StyleContentWrapper,
  StyleFeatureCard,
  StyleIcon,
  StyleIconWrapper,
} from "./style";
import Svg from "@/shared/svg";
import Typography from "@/shared/typography";

interface FeatureCardProps {
  iconSrc?: string;
  title?: string;
  subtitle?: string;
}
const FeatureCard: FC<FeatureCardProps> = ({ iconSrc, title, subtitle }) => {
  return (
    <StyleFeatureCard>
      <StyleIconWrapper>
        <StyleIcon src={iconSrc} />
      </StyleIconWrapper>
      <StyleContentWrapper>
        <Typography size="28px" weight="500">
          {title}
        </Typography>
        <Typography styletypography="width:200px" lineheight="1.3">
          {subtitle}
        </Typography>
      </StyleContentWrapper>
    </StyleFeatureCard>
  );
};

export default FeatureCard;
