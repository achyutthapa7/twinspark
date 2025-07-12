import styled from "styled-components";

interface RowProps {
  stylerow?: string;
  gap?: string;
}

export const RowWrapper = styled.div<RowProps>`
  display: flex;
  align-items: start;
  column-gap: ${({ gap }) => gap || "24px"};
  @media (max-width: 768px) {
    flex-direction: column;
  }
  ${({ stylerow }) => stylerow}
`;
