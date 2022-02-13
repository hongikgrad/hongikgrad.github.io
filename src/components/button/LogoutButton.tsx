import * as React from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { logoutUser } from "../../modules/auth";
import Button from "./Button";
import TextButton from "./TextButton";

export default function LogoutButton(props: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlerLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    // window.sessionStorage.setItem("login", "false");
  };
  return (
    <TextButton onClick={handlerLogout} width={1} height={1}>
      logout
    </TextButton>
  );
}
