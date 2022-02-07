import * as React from "react";
import Input from "./Input";

export default function SearchInput(props: any) {
  return <Input width={18} placeholder="과목을 검색하세요." {...props} />;
}
