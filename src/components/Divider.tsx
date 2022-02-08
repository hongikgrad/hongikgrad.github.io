import * as React from "react";

export interface DividerProps {}

export default function Divider(props: DividerProps) {
  return (
    <div
      style={{
        width: "100%",
        borderTop: "0.5px solid #808080 ",
      }}></div>
  );
}
