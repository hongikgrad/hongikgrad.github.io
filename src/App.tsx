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

export interface AppProps {}

export default function App(props: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes location={location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </Router>
    </>
  );
}
