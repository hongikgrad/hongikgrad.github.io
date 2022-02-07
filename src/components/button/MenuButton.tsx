import * as React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function MenuButton(props: any) {
  return (
    <Link to={props.href}>
      <Button width={26} height={5} color="#e5e5e5">
        {props.text}
      </Button>
    </Link>
  );
}
