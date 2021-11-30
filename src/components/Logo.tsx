import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLogo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 2.4rem;
  font-family: GothamSSmBookItalic;
  color: black;
  flex-direction: column;

  transition: all 1s, color 0.5s;
  :hover {
    opacity: 0.3;
  }
`;

const StyledLink = styled(Link)`
  height: 100%;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
`;

const Red = styled.span`
  color: red;
`;

export interface LogoProps {}

export default function Logo(props: LogoProps) {
  return (
    <StyledLink to="/">
      <StyledLogo>
        <div>hongik</div>
        <div>
          <Red>-</Red>grad<Red>.</Red>github<Red>.</Red>io
        </div>
      </StyledLogo>
    </StyledLink>
  );
}
