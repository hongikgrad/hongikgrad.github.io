import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../modules";
import { setMenuClose, ToggleMenu } from "../modules/menu";
import { Link, RouteProps } from "react-router-dom";

export interface MenuProps {
  className?: string;
}

const StyledMenuWrapper = styled.ul`
  background-color: #8b00ff;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  transition: all 1s;
  &.open {
    height: 100%;
    a {
      z-index: 10;
    }
  }
  &.closed {
    height: 0;
    a {
      z-index: -1;
    }
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledMenu = styled(Link)`
  color: white;
`;

export default function Menu(props: RouteProps) {
  const isMenuOpen = useSelector((state: RootState) => state.menu.open);
  const dispatch = useDispatch();
  const onMenuClickHandler = () => {
    dispatch(setMenuClose());
  };
  return (
    <StyledMenuWrapper className={isMenuOpen ? "open" : "closed"}>
      <StyledMenu to="/login">로그인</StyledMenu>
      <StyledMenu to="/">이수수업확인</StyledMenu>
      <StyledMenu to="/">졸업요건조회</StyledMenu>
      <StyledMenu to="/">인기교양</StyledMenu>
    </StyledMenuWrapper>
  );
}
