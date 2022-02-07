import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import TextLink from "./button/TextLink";

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  font-family: "Montserrat", sans-serif;
  font-size: 34px;
  :hover {
    opacity: 0.5;
  }
  // @media (max-width: 768px) {
  //   color: black;
  //   font-size: 20px;
  // }
`;

const Point = styled.span`
  color: #8b00ff;
`;

export interface LogoProps {}

export default function LogoButton(props: LogoProps) {
  return (
    <TextLink to="/" width={2}>
      hongikgrad
    </TextLink>
  );
}
