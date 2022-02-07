import { Stack } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../modules";
import BurgerMenu from "./BurgerMenu";
import LoginButton from "./button/LoginButton";
import LogoutButton from "./button/LogoutButton";
import LogoButton from "./LogoButton";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 26rem;
`;

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  return (
    <HeaderWrapper>
      <LogoButton />
      {/* <BurgerMenu /> */}
      {isLogin ? <LogoutButton /> : <LoginButton />}
    </HeaderWrapper>
  );
}
