import axios from "axios";
import * as React from "react";
import { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { API_BASE_URL } from "../../config";
import Input from "../input/Input";

const StyledTable = styled.table`
  width: 26rem;
  border-collapse: collapse;

  th {
    // border-top: 1px solid black;
    // border-bottom: 1px solid black;
    border-top: 0.1rem solid black;
    border-bottom: 0.1rem solid black;
  }

  tbody {
    width: 25rem;
  }
  tr {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const TableData = styled.td<{ width: number }>`
  width: ${({ width }) => width}rem;
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
`;

const TableButton = styled.td`
  width: 0.5rem;
  border-bottom: 0.1rem solid black;
`;

const config = {
  withCredentials: true,
};

export default function EditableMajorTable(props: any) {
  const majorId = props.majorId;
  const rows = props.rows;
  const rowsHandler = props.rowsHandler;
  // const columns = props.columns;

  const columns = ["ID", "전공명", "단과대학"];
  const [changeToggle, setChangeToggle] = useState<boolean>(false);

  const [addMajorInput, setAddMajorInput] = useState<string>("");
  const [edit, setEdit] = useState<number>(-1);

  const [majorNameInput, setMajorNameInput] = useState<string>("");
  const [collegeInput, setCollegeInput] = useState<string>("");

  const [add, setAdd] = useState<number>(-1);

  const [checked, setChecked] = useState<number>(-1);

  const [majorCodeInput, setMajorCodeInput] = useState<string>("");

  const handleDeleteButton = (majorId: number) => {
    const url = `${API_BASE_URL}/admin/majors/${majorId}`;
    axios
      .delete(url, config)
      .then(() => {
        setChangeToggle(!changeToggle);
      })
      .catch((e: any) => {
        console.log(e);
        alert("삭제에 실패하였습니다.");
      });
  };

  const handleAddMajorInput = (e: any) => {
    setAddMajorInput(e.target.value);
  };

  const handleModifyMajorButton = (edit: number, majorId: number) => {
    setMajorNameInput("");
    if (edit != majorId) setEdit(majorId);
    else setEdit(-1);
  };

  const handleMajorNameInput = (e: any) => {
    setMajorNameInput(e.target.value);
  };

  const handleCollegeInput = (e: any) => {
    setCollegeInput(e.target.value);
  };

  const handleAddSlaveButton = (majorId: number) => {
    setAdd(majorId);
  };

  const handleMajorCodeInput = (e: any) => {
    setMajorCodeInput(e.target.value);
  };

  const handleDoneSlaveButton = () => {
    const url = `${API_BASE_URL}/admin/majors/${add}/hierarchy/${checked}`;
    axios
      .post(url, null, config)
      .then((res) => {
        setChangeToggle(!changeToggle);
      })
      .then(() => {
        setAdd(-1);
        setChecked(-1);
      });
  };

  const handleSaveMajorButton = (
    majorId: number,
    input: { majorName: string; college: string; code: string }
  ) => {
    const url = `${API_BASE_URL}/admin/majors/${majorId}`;
    const data = {
      name: input.majorName,
      college: input.college,
      code: input.code,
    };
    axios
      .patch(url, data, config)
      .then((res) => {
        setChangeToggle(!changeToggle);
      })
      .catch((e: any) => {
        console.log(e);
        alert("수정에 실패하였습니다.");
      })
      .finally(() => {
        setEdit(-1);
      });
  };

  const handleAddMajorCourseButton = (majorName: string) => {
    const url = `${API_BASE_URL}/admin/majors`;
    const data = {
      name: majorName,
    };
    axios
      .post(url, data, config)
      .then((res) => {
        setChangeToggle(!changeToggle);
      })
      .catch((e) => {
        console.log(e);
        alert("전공 추가에 실패하였습니다.");
      });
  };

  const handleCheckbox = (e: any) => {
    setChecked(e.target.value);
  };

  const handleSlaveDeleteButton = (majorId: number, slaveId: number) => {
    const url = `${API_BASE_URL}/admin/majors/${majorId}/hierarchy/${slaveId}`;
    axios.delete(url, config).then(() => {
      setChangeToggle(!changeToggle);
    });
  };

  const handleEnableButton = (majorId: number) => {
    const url = `${API_BASE_URL}/admin/majors/${majorId}`;
    const data = {
      enableToggle: 1,
    };
    axios.patch(url, data, config).then(() => {
      setChangeToggle(!changeToggle);
    });
  };

  useEffect(() => {
    const majorListUrl = `${API_BASE_URL}/admin/majors`;
    axios.get(majorListUrl, config).then((res) => {
      rowsHandler([...res.data]);
      console.log(res.data);
    });
  }, [changeToggle]);

  return (
    <StyledTable>
      <thead>
        <tr>
          {add == -1 ? <></> : <th></th>}
          {columns.map((column: any, index: number) => (
            <th key={index}>{column}</th>
          ))}
          <th>전공코드</th>

          <th>en</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row: any, index: number) => {
          const slaveList = row.slaveList;
          const majorId = row.id;
          return (
            <Fragment key={index}>
              <tr>
                {add == -1 ? (
                  <></>
                ) : (
                  <>
                    {add == majorId ? (
                      <>
                        <td></td>
                      </>
                    ) : (
                      <>
                        <TableData width={0.3}>
                          <input
                            type="checkbox"
                            name="_selected_"
                            value={row.id}
                            onChange={handleCheckbox}
                          />
                        </TableData>
                      </>
                    )}
                  </>
                )}

                <TableData width={0.3}>{row.id}</TableData>
                {edit == majorId ? (
                  <>
                    <TableData width={2}>
                      <Input
                        value={majorNameInput}
                        onChange={handleMajorNameInput}
                      />
                    </TableData>
                    <TableData width={2}>
                      <Input
                        value={collegeInput}
                        onChange={handleCollegeInput}
                      />
                    </TableData>
                    <TableData width={2}>
                      <Input
                        value={majorCodeInput}
                        onChange={handleMajorCodeInput}
                      />
                    </TableData>
                  </>
                ) : (
                  <>
                    <TableData width={8}>{row.name}</TableData>
                    <TableData width={8}>{row.college}</TableData>
                    <TableData width={8}>{row.code}</TableData>
                    <TableData
                      width={1}
                      onClick={() => handleEnableButton(row.id)}>
                      {row.enable ? "1" : "0"}
                    </TableData>
                  </>
                )}
                {add == majorId ? (
                  <>
                    <TableButton colSpan={3} onClick={handleDoneSlaveButton}>
                      완료
                    </TableButton>
                  </>
                ) : (
                  <>
                    <TableButton onClick={() => handleAddSlaveButton(majorId)}>
                      추가
                    </TableButton>
                  </>
                )}
                {add == majorId ? (
                  <></>
                ) : (
                  <>
                    {edit == majorId ? (
                      <>
                        <TableButton
                          onClick={() =>
                            handleSaveMajorButton(majorId, {
                              majorName: majorNameInput,
                              college: collegeInput,
                              code: majorCodeInput,
                            })
                          }>
                          완료
                        </TableButton>
                      </>
                    ) : (
                      <TableButton
                        onClick={() => {
                          handleModifyMajorButton(edit, majorId);
                          setMajorNameInput(row.name);
                          setCollegeInput(row.college ? row.college : "");
                          setMajorCodeInput(row.code ? row.code : "");
                        }}>
                        수정
                      </TableButton>
                    )}
                    {edit == majorId ? (
                      <>
                        <TableButton
                          onClick={() =>
                            handleModifyMajorButton(edit, majorId)
                          }>
                          취소
                        </TableButton>
                      </>
                    ) : (
                      <>
                        <TableButton
                          onClick={() => handleDeleteButton(majorId)}>
                          삭제
                        </TableButton>
                      </>
                    )}
                  </>
                )}
              </tr>

              {slaveList.length > 0 &&
                slaveList.map((slave: any, index: number) => {
                  return (
                    <tr key={index}>
                      <TableData width={2} colSpan={6}>
                        {slave.name}
                      </TableData>
                      <TableButton
                        onClick={() =>
                          handleSlaveDeleteButton(majorId, slave.id)
                        }
                        colSpan={1}>
                        삭제
                      </TableButton>
                    </tr>
                  );
                })}
            </Fragment>
          );
        })}
        <tr>
          <td colSpan={3}>
            <Input
              width={20}
              height={2}
              placeholder="추가할 전공을 입력해주세요"
              onChange={handleAddMajorInput}
            />
          </td>
          <td onClick={() => handleAddMajorCourseButton(addMajorInput)}>
            추가
          </td>
        </tr>
      </tbody>
    </StyledTable>
  );
}
