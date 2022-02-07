import * as React from "react";
import styled from "styled-components";

export interface InputProps {
  children?: React.ReactNode;
  width?: number;
  height?: number;
}

const StyledInput = styled.input<{
  width?: number;
  height?: number;
}>`
  width: ${({ width }) => (width ? width : 15)}rem;
  height: ${({ height }) => (height ? height : 4)}rem;
  border: 0.1rem black solid;
  font-size: inherit;
  font-family: "Noto Sans KR", sans-serif;

  padding: 1rem;

  ::-webkit-input-placeholder {
    transition: all 1s, color 0.5s;
  }

  ::placeholder {
    opacity: 1;
  }

  :focus {
    ::-webkit-input-placeholder {
      transition: all 1s, color 0.5s;
      color: transparent;
    }
  }

  :hover {
    ::-webkit-input-placeholder {
      transition: all 1.5s, color 0.5s;
      opacity: 0.3;
    }
  }

  border-radius: 0.5rem;
`;

export default function Input(props: any) {
  return <StyledInput {...props} />;
}
