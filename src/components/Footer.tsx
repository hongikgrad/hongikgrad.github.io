import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export interface FooterProps {}

const Block = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const GithubLogo = styled.img`
  width: 2rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  transition: all 0.9s, color 0.3s;
  :hover {
    opacity: 0.5;
  }
`;

const StyledLink = styled.a`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  text-decoration: none;
  color: black;
  font-weight: 1000;
  transition: all 1s, color 0.5s;
  :hover {
    opacity: 0.5;
  }
`;

export default function Footer(props: FooterProps) {
  return (
    <Block>
      <StyledLink href="https://github.com/hongik-grad">&lt;/&gt;</StyledLink>
      <a href="https://github.com/ujunhwan">
        <GithubLogo src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
      </a>
    </Block>
  );
}
