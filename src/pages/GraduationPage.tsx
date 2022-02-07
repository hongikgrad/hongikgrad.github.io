import React, { ReactElement } from "react";
import PageTemplate from "../components/PageTemplate";

interface Props {}

// 로그인 확인 -> 로그인 했으면 fetch 안했거나, 토큰 만료 오류나면 로그인 페이지로
export default function GraduationPage(Props: Props) {
  return (
    <>
      <PageTemplate>Graduationpage</PageTemplate>
    </>
  );
}
