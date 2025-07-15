import styled from "styled-components";

export const StyleSvgWrapper = styled.div<{ styleSvg?: string }>`
  ${(props) => props.styleSvg};
`;
