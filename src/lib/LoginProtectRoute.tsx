import * as React from "react";
import { Navigate, Route } from "react-router";

export interface ProtectedRouteProps {}

export default function LoginProtectRoute(props: any) {
  return props.isLogin ? <Navigate to="/" /> : props.outlet;
}
