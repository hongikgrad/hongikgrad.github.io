import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

import "./App.css";
import GlobalStyles from "./GlobalStyles";
import TakenPage from "./pages/TakenPage";
import GraduationPage from "./pages/GraduationPage";
import CoursesPage from "./pages/CoursesPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./modules";
import ProtectedRoute from "./lib/ProtectedRoute";
import LoginProtectRoute from "./lib/LoginProtectRoute";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "./config";
import axios from "axios";
import { loginUser, logoutUser } from "./modules/auth";

export interface AppProps {}

export default function App(props: AppProps) {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const dispatch = useDispatch();

  /* 매번 로그인 인증 하는 녀석 */

  // useEffect(() => {
  //   console.log("APP");
  //   const url = API_BASE_URL + "/auth/token";
  //   const config = {
  //     withCredentials: true,
  //   };
  //   axios
  //     .get(url, config)
  //     .then((res) => {
  //       console.log(res);
  //       dispatch(loginUser());
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       dispatch(logoutUser());
  //     });
  // }, []);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes location={location}>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/login"
            element={
              <LoginProtectRoute isLogin={isLogin} outlet={<LoginPage />} />
            }
          />
          <Route
            path="/users/courses"
            element={
              <ProtectedRoute isLogin={isLogin} outlet={<TakenPage />} />
            }
          />
          <Route
            path="/users/graduation"
            element={
              <ProtectedRoute isLogin={isLogin} outlet={<GraduationPage />} />
            }
          />
          <Route path="/courses" element={<CoursesPage />} />
        </Routes>
      </Router>
    </>
  );
}
