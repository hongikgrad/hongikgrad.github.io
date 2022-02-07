import * as React from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ width: number }>`
  color: black;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  font-family: "Montserrat", sans-serif;
  font-size: ${({ width }) => width}rem;
  :hover {
    opacity: 0.5;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
`;

export default function TextButton(props: any) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}
