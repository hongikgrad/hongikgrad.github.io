import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)<{ width: number }>`
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
`;

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

export default function TextLink(props: any) {
  return <StyledLink {...props}>{props.children}</StyledLink>;
}
