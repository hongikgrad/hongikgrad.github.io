import * as React from "react";
import styled from "styled-components";

export interface TableProps {
  children?: React.ReactNode;
}

const StyledTable = styled.table`
  border-collapse: collapse;
  th {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }
  td {
    padding: 0.3rem;
    border-bottom: 1px solid black;
  }
`;

export default function Table(props: TableProps) {
  return <StyledTable>{props.children}</StyledTable>;
}
