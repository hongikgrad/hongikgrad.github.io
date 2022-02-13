import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from "../components/Login";
import PageTemplate from "../components/PageTemplate";
import { logoutUser } from "../modules/auth";

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutUser());
  }, []);
  return (
    <PageTemplate>
      <Login />
    </PageTemplate>
  );
}
