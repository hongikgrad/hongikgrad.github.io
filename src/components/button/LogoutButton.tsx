import * as React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../modules/auth";
import Button from "./Button";
import TextButton from "./TextButton";

export default function LogoutButton(props: any) {
  const dispatch = useDispatch();
  const handlerLogout = () => {
    dispatch(logoutUser());
    // window.sessionStorage.setItem("login", "false");
  };
  return (
    <TextButton onClick={handlerLogout} width={1} height={1}>
      logout
    </TextButton>
  );
}
