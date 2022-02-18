import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { API_BASE_URL } from "../../config";

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

type MajorCourseType = {
  id: number;
  name: string;
  number: string;
  credit: number;
  required: boolean;
  abeek: string;
  semester: string;
};

export default function EditableMajorCourseTable(props: any) {
  const columns = ["ID", "과목명", "학수번호", "학점", "필수"];
  const majorId = props.majorId;

  const [majorCourseList, setMajorCourseList] = useState<
    Array<MajorCourseType>
  >([]);
  const [reload, setReload] = useState<boolean>(false);

  const handleRequiredButton = async (majorId: number, courseId: number) => {
    try {
      const url = `${API_BASE_URL}/admin/majors/${majorId}/courses/${courseId}`;
      await axios.patch(url);
      await setReload(!reload);
    } catch (e: any) {
      alert("변경에 실패하였습니다.");
    }
  };

  const handleDeleteButton = async (majorId: number, courseId: number) => {
    try {
      const url = `${API_BASE_URL}/admin/majors/${majorId}/courses/${courseId}`;
      await axios.delete(url);
      await setReload(!reload);
    } catch (e: any) {
      alert("삭제에 실패하였습니다.");
    }
  };

  useEffect(() => {
    const majorCourseListUrl = `${API_BASE_URL}/admin/majors/${majorId}/courses`;
    axios.get(majorCourseListUrl).then((res) => {
      setMajorCourseList([...res.data]);
    });
  }, [majorId, reload]);

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
        {majorCourseList.map((row: any, index: number) => {
          const courseId = row.id;
          return (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.number}</td>
              <td>{row.credit}</td>
              <td onClick={() => handleRequiredButton(majorId, courseId)}>
                {row.required ? "필수" : ""}
              </td>
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
