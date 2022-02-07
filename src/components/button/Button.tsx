import * as React from "react";
import styled from "styled-components";

const StyledButton = styled.button<{
  width?: number;
  height?: number;
  color?: string;
  hover?: boolean;
}>`
  width: ${({ width }) => (width ? width : 15)}rem;
  height: ${({ height }) => (height ? height : 4)}rem;
  // margin: 0.1rem;
  border: 0.1rem black solid;

  cursor: pointer;
  color: #333;
  transition: all 0.9s, color 0.3s;
  font-size: inherit;

  :hover {
    opacity: 0.7;
  }
  :active {
    transition: all 0.1s;
    background-color: #808080;
  }

  background-color: ${({ color }) => (color ? color : "#c0c0c0")};

  font-weight: 700;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Button(props: any) {
  return (
    <StyledButton
      width={props.width}
      height={props.height}
      color={props.color}
      hover={props.hover}
      {...props}>
      {props?.children}
    </StyledButton>
  );
}
