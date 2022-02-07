import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/button/Button";
import PageTemplate from "../components/PageTemplate";
import Table from "../components/table/Table";
import { API_BASE_URL } from "../config";
import { RootState } from "../modules";

interface Props {}

export default function TakenPage(Props: Props) {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalCredit, setTotalCredit] = useState<number>(0);
  const [courses, setCourses] = useState<any>([]);
  const [isError, setError] = useState<boolean>(false);

  useEffect(() => {
    const url = API_BASE_URL + "/users/courses";
    const config = {
      withCredentials: true,
    };
    axios
      .get(url, config)
      .then((res) => {
        setTotalCount(res.data.totalCount);
        setTotalCredit(res.data.totalCredit);
        setCourses([...res.data.courses]);
      })
      .catch((e) => {
        setError(true);
      });
  }, []);

  return (
    <>
      <PageTemplate>
        {isError && <div>error T.T</div>}
        {totalCount == 0 ? (
          <></>
        ) : (
          <>
            <div>{totalCount}개의 강의를 수강하셨습니다.</div>
            <div>{totalCredit}학점을 들으셨습니다.</div>
            <Table rows={courses} columns={["강의명", "학수번호", "학점"]} />
          </>
        )}
      </PageTemplate>
    </>
  );
}
