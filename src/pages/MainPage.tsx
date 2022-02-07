import * as React from "react";
import PageTemplate from "../components/PageTemplate";
import { Stack } from "@mui/material";
import MenuButton from "../components/button/MenuButton";

export interface MainPageProps {}

export default function MainPage(props: MainPageProps) {
  return (
    <PageTemplate>
      <Stack spacing={"0.5rem"}>
        <MenuButton text="내가 수강한 과목 보기" href="/users/courses" />
        <MenuButton text="졸업요건 검사하기" href="/users/graduation" />
        <MenuButton text="등록된 과목 보기" href="/courses" />
      </Stack>
    </PageTemplate>
  );
}
