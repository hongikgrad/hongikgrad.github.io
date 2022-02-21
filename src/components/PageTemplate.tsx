import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../modules";
import { setMenuClose, ToggleMenu } from "../modules/menu";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";

const PageStyle = styled.div`
  min-height: calc(var(--vh) * 100);
  background-color: white;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  transition: opacity 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledBody = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Noto Sans KR", sans-serif;
`;

export interface PageTemplateProps {
  children?: React.ReactNode;
}

export default function PageTemplate(props: PageTemplateProps) {
  const dispatch = useDispatch();
  const setVh = () => {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  };
  window.addEventListener("resize", setVh);

  React.useEffect(() => {
    setVh();
    // dispatch(setMenuClose());
  }, []);
  return (
    <PageStyle id="layout">
      {/* <Menu /> */}
      <Header />
      <StyledBody id="content">{props.children}</StyledBody>
      <Footer />
    </PageStyle>
  );
}
