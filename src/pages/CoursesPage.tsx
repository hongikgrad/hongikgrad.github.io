import axios from "axios";
import * as config from "../config";
import React, { useEffect, useState } from "react";
import PageTemplate from "../components/PageTemplate";
import { Stack } from "@mui/material";

import SearchInput from "../components/input/SearchInput";
import SearchButton from "../components/button/SearchButton";
import Table from "../components/table/Table";
import MoreButton from "../components/button/MoreButton";

const BASE_URL = config.API_BASE_URL as string;

interface Props {}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: any, number: number) => void;
}

type CourseType = {
  name: string;
  number: string;
  credit: number;
};

type CourseListType = {
  [key: number]: CourseType;
};

export default function CoursesPage(Props: Props) {
  const [rows, setRows] = useState<Array<CourseListType>>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [rowLength, setRowLength] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [searchCount, setSearchCount] = useState<number>(0);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangeSearchInput = (event: any) => {
    setSearchInput(event.target.value);
  };

  const handleSearchButton = (event: any) => {
    const config = {
      withCredentials: true,
    };
    const url = BASE_URL + `/courses?keyword=${searchInput}`;
    axios.get(url, config).then((res) => {
      const courseList = res.data.courses;
      setRows([...courseList]);
      setRowLength(courseList.length);
      setHasSearch(true);
      setSearchCount(courseList.length);
    });
  };

  useEffect(() => {
    const url = `${BASE_URL}/courses/count`;
    axios.get(url).then((res) => {
      setTotalCount(res.data);
    });
  }, []);

  useEffect(() => {
    const url = `${BASE_URL}/courses?size=${rowsPerPage}&page=${page}`;
    axios.get(url).then((res) => {
      const courseList = res.data.courses;
      setRows([...courseList]);
      setRowLength(courseList.length);
    });
  }, [page, rowsPerPage]);

  const defaultNotice = `현재 ${totalCount}개의 수업이 등록되어 있습니다.`;
  const searchNotice = `${searchCount}개의 수업이 검색 되었습니다.`;
  return (
    <>
      <PageTemplate>
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          justifyContent="center">
          <div>{hasSearch ? searchNotice : defaultNotice}</div>
          <Stack direction="row" spacing={1}>
            <SearchInput onChange={handleChangeSearchInput} />
            <SearchButton onClick={handleSearchButton} />
          </Stack>
          {searchCount ? (
            <Table rows={rows} columns={["과목명", "학수번호", "학점"]} />
          ) : (
            <></>
          )}
          {/* <MoreButton /> */}
        </Stack>
      </PageTemplate>
    </>
  );
}
