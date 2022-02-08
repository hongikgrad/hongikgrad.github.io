import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 26rem;
  border-collapse: collapse;

  th {
    // border-top: 1px solid black;
    // border-bottom: 1px solid black;
    border-top: 0.1rem solid black;
    border-bottom: 0.1rem solid black;
  }

  td {
    width: 2rem;
    padding: 0.3rem;
    // border-bottom: 1px solid black;
    border-bottom: 0.1rem solid black;
    a:link {
      color: #333;
    }
    a:visited {
      color: #000;
    }
    a:hover {
      color: #808080;
    }
    a:active {
      color: #808080;
    }
  }

  tbody {
    width: 25rem;
  }
  tr {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default function Table(props: any) {
  const rows = props.rows;
  const columns = props.columns;

  return (
    <StyledTable>
      <thead>
        <tr>
          {columns.map((column: any, index: number) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row: any) => {
          const year =
            typeof row.semester === "string"
              ? row.semester.substring(0, 4)
              : "";
          const hakgi =
            typeof row.semester === "string" ? row.semester.substring(4) : "";
          const url =
            typeof row.semester === "string"
              ? `https://sugang.hongik.ac.kr/cn13061.jsp?yy=${year}&hakgi=${hakgi}&haksu=${row.number}&bunban=1`
              : "/";
          return (
            <tr key={row.number + row.credit}>
              <td>
                <a
                  key={row}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer">
                  {row.name}
                </a>
              </td>

              <td>{row.number}</td>
              <td>{row.credit}</td>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}
