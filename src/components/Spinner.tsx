import * as React from "react";

import styled, { keyframes } from "styled-components";

export interface SpinnerProps {}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;

  border: 8px solid transparent;
  border-radius: 50%;
  border-top-color: #8b00ff;
  border-bottom-color: #8b00ff;

  transition: 3s;
  animation: ${spin} 1s linear infinite;
`;

const Circle = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #f7f8f9;
  border-radius: 50%;
`;

export default function Spinner(props: SpinnerProps) {
  return (
    <StyledSpinner>
      <Circle />
    </StyledSpinner>
  );
}
