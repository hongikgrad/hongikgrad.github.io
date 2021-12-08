import * as React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ToggleMenu } from "../modules/menu";
import { RootState } from "../modules";

export interface BurgerMenuProps {
  onClick?: any;
}

const StyledBurger = styled.div`
  width: 24px;
  height: 24px;
  background-color: transparent;
  margin: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: space-around;
  justify-content: space-around;
`;

const Line = styled.div`
  width: 100%;
  background-color: black;
  height: 2px;
  margin: auto;
  transition: all 1s;
  &.top {
    transform: translateY(8px) rotate(45deg);
  }
  &.mid {
    background-color: transparent;
  }
  &.bot {
    transform: translateY(-8px) rotate(-45deg);
  }
`;

export default function BurgerMenu(props: BurgerMenuProps) {
  const dispatch = useDispatch();
  const onToggleMenu = () => dispatch(ToggleMenu());
  const isOpen = useSelector((state: RootState) => state.menu.open);
  return (
    <StyledBurger onClick={onToggleMenu}>
      <Line className={isOpen ? "top" : ""} />
      <Line className={isOpen ? "mid" : ""} />
      <Line className={isOpen ? "bot" : ""} />
    </StyledBurger>
  );
}
