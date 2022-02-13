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
import { useEffect, useState } from "react";
import { API_BASE_URL } from "./config";
import axios from "axios";
import { loginUser, logoutUser } from "./modules/auth";
import AdminPage from "./pages/AdminPage";

export interface AppProps {}

export default function App(props: AppProps) {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes location={location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
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
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </>
  );
}
