import * as React from "react";
import { Navigate, Route } from "react-router";

export interface ProtectedRouteProps {}

export default function ProtectedRoute(props: any) {
  return props.isLogin ? props.outlet : <Navigate to="/login" />;
}
