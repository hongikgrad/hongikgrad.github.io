import * as React from "react";
import Button from "./Button";

export default function SearchButton(props: any) {
  return (
    <Button width={6} height={4} color="#e5e5e5" {...props}>
      검색
    </Button>
  );
}
