import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ResultPage from "./pages/ResultPage";
import FeedbackPage from "./pages/FeedbackPage";

import { Helmet } from "react-helmet";

import "./App.css";
import GlobalStyles from "./GlobalStyles";

export interface AppProps {}

export default function App(props: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Helmet>
        <title>HONGIKGRAD</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"></link>
      </Helmet>
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
