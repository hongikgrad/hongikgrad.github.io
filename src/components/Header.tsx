import * as React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  return (
    <StyledHeader>
      <Logo />
    </StyledHeader>
  );
}