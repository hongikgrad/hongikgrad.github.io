import * as React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const PageStyle = styled.div`
  min-height: calc(var(--vh) * 100);
  background-color: #f7f8f9;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  transition: opacity 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledBody = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export interface PageTemplateProps {
  children?: React.ReactNode;
}

export default function PageTemplate(props: PageTemplateProps) {
  const setVh = () => {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  };
  window.addEventListener("resize", setVh);

  React.useLayoutEffect(() => {
    setVh();
  }, []);
  return (
    <PageStyle id="layout">
      <Header />
      <StyledBody id="content">{props.children}</StyledBody>
      <Footer />
    </PageStyle>
  );
}
