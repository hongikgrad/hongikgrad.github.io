import * as React from "react";
import styled from "styled-components";

export interface ButtonProps {
  children?: React.ReactNode;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
}

const StyledButton = styled.div<{
  height?: number;
  width?: number;
  color?: string;
}>`
  height: ${(props) => props.height}rem;
  width: ${(props) => props.width}rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin: 1rem;
  font-family: Noto Sans KR;

  -webkit-tap-highlight-color: transparent;

  transition: all 1.5s, color 0.5s;
  :hover {
    opacity: 0.4;
  }

  :active {
    opcaity: 0.3;
  }
`;

export default function Button(props: ButtonProps) {
  return (
    <StyledButton height={props.height} width={props.width} color={props.color}>
      {props?.children}
    </StyledButton>
  );
}
