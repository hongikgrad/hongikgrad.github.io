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
    width: 26rem;
  }
  tr {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default function EditableMajorCourseTable(props: any) {
  const rows = props.rows;
  const columns = props.columns;
  const handleDeleteButton = props.handleDeleteButton;
  const majorId = props.majorId;

  return (
    <StyledTable>
      <thead>
        <tr>
          {columns.map((column: any, index: number) => (
            <th key={index}>{column}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row: any, index: number) => {
          const courseId = row.id;
          return (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.number}</td>
              <td>{row.credit}</td>
              <td onClick={() => handleDeleteButton(majorId, courseId)}>
                삭제
              </td>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}
