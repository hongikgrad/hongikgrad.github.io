import * as React from "react";
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import styled from "styled-components";
import ResultPage from "./pages/ResultPage";
import FeedbackPage from "./pages/FeedbackPage";

import "./App.css";
import GlobalStyles from "./GlobalStyles";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export interface AppProps {}

export default function App(props: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Container>
        <Router>
          <Routes>
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
