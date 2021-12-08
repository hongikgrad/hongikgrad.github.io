import * as React from "react";
import styled from "styled-components";
import BurgerMenu from "./BurgerMenu";
import Logo from "./Logo";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 900px) {
    padding: 0 20px;
    height: 40px;
  }
`;

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  return (
    <StyledHeader>
      <Logo />
      <BurgerMenu />
    </StyledHeader>
  );
}
