import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import styled from "styled-components";
import ResultPage from "./pages/ResultPage";
import FeedbackPage from "./pages/FeedbackPage";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./App.css";
import GlobalStyles from "./GlobalStyles";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export interface AppProps {}

export default function App(props: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Container>
        <Router>
          <Routes location={location}>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
}
