import styled from "styled-components";

export const StyleLoaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

export const StyleLoader = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100vh;
  /* border-top: 2px solid yellow; */
  animation: loading 4s infinite;

  @keyframes loading {
    0% {
      border-top: 2px solid yellow;
    }
    20% {
      border-right: 2px solid yellow;
    }
    40% {
      border-bottom: 2px solid yellow;
    }
    80% {
      border-left: 2px solid yellow;
    }
    100% {
      border-top: 2px solid yellow;
    }
  }
`;
