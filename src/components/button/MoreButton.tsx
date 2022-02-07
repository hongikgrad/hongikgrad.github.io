import * as React from "react";
import Button from "./Button";

export interface MoreButtonProps {}

export default function MoreButton(props: MoreButtonProps) {
  const handleMoreButton = () => {
    console.log("GET MORE!!");
  };
  return (
    <Button
      width={27.5}
      height={2}
      color="#fff"
      onClick={handleMoreButton}
      {...props}>
      더 보기
    </Button>
  );
}
