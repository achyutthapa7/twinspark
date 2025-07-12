import styled from "styled-components";

interface ColumnProps {
  gap?: string;
  stylecolumn?: string;
}

export const ColumnWrapper = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  row-gap: ${(props: any) => props.gap || "24px"};
  ${({ stylecolumn }) => stylecolumn}
`;
