import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export interface FooterProps {}

const Block = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GithubLogo = styled.img`
  width: 2rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const StyledLink = styled.a`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  text-decoration: none;
  color: black;
  font-weight: 1000;
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
