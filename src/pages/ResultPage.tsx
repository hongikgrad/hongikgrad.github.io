import * as React from "react";
import PageTemplate from "../components/PageTemplate";
import Result from "../components/Result";

export interface ResultPageProps {}

export default function ResultPage(props: ResultPageProps) {
  return (
    <PageTemplate>
      <Result />
    </PageTemplate>
  );
}
