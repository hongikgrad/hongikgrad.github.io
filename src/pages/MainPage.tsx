import * as React from "react";
import styled from "styled-components";
import FeedbackButton from "../components/button/FeedbackButton";
import PageTemplate from "../components/PageTemplate";
import TestButton from "../components/button/TestButton";

export interface MainPageProps {}

export default function MainPage(props: MainPageProps) {
  return (
    <PageTemplate>
      <TestButton />
      <FeedbackButton />
    </PageTemplate>
  );
}
