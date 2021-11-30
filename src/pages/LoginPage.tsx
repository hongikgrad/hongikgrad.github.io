import * as React from "react";
import Login from "../components/Login";
import PageTemplate from "../components/PageTemplate";

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  return (
    <PageTemplate>
      <Login />
    </PageTemplate>
  );
}
