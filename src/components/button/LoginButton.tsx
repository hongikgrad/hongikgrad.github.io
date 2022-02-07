import * as React from "react";
import { useNavigate } from "react-router";
import TextLink from "./TextLink";

export interface LoginButtonProps {}

export default function LoginButton(props: LoginButtonProps) {
  return (
    <TextLink width={1} to="/login">
      login
    </TextLink>
  );
}
