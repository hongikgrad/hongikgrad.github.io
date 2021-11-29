import * as React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import styled from "styled-components";

export interface FeedbackProps {
  name?: string;
  children?: React.ReactNode;
}

const Block = styled(Link)`
  font-size: 2.5rem;
  text-decoration: none;
  color: #454c53;
`;

export default function FeedbackButton(props: FeedbackProps) {
  return (
    <Button width={12} height={6} color="green">
      <Block to="login">피드백하기</Block>
    </Button>
  );
}
