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
  height: 2.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  transition: all 0.9s, color 0.3s;
  :hover {
    opacity: 0.5;
  }
`;

const StyledLink = styled.a`
  font-size: 1.75rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  text-decoration: none;
  color: black;
  font-weight: 900;
  transition: all 1s, color 0.5s;
  :hover {
    opacity: 0.5;
  }
`;

export default function Footer(props: FooterProps) {
  return (
    <Block>
      <StyledLink
        href="https://github.com/hongikgrad"
        target="_blank"
        rel="noopener noreferrer">
        &lt;/&gt;
      </StyledLink>
      <a
        href="https://github.com/ujunhwan"
        target="_blank"
        rel="noopener noreferrer">
        <GithubLogo src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
      </a>
    </Block>
  );
}
