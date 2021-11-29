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
  margin: 0.5rem;
  font-family: Noto Sans KR;
  a:hover {
    color: #999999;
  }
  -webkit-tap-highlight-color: transparent;
`;

export default function Button(props: ButtonProps) {
  return (
    <StyledButton height={props.height} width={props.width} color={props.color}>
      {props?.children}
    </StyledButton>
  );
}
