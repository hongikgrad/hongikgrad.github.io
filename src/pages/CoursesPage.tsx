import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import PageTemplate from "../components/PageTemplate";
import { Stack } from "@mui/material";

import styled from "styled-components";

import SearchInput from "../components/input/SearchInput";
import SearchButton from "../components/button/SearchButton";
import Table from "../components/table/Table";
import Divider from "../components/Divider";
import { useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../config";

interface Props {}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: any, number: number) => void;
}

const StyledSelect = styled.select<{ width?: number; height?: number }>`
  width: ${({ width }) => (width ? width : 12)}rem;
  // height: 2rem;
  height: ${({ height }) => (height ? height : 2)}rem;
  text-align-last: center;
  text-align: center;
  border: 0.1rem black solid;
  font-size: 1rem;
  border-radius: 0.5rem;
  font-weight: 700;
`;

const config = { withCredentials: true };

type CourseType = {
  name: string;
  number: string;
  credit: number;
};

type CourseListType = {
  [key: number]: CourseType;
};

const bold = {
  fontWeight: 700,
};

type TipType = {
  tipTab: boolean;
};

const regex = /^[가-힣a-zA-Z():]{2,}$/;
// const regex2 = /^[0-9\b -]{0,13}$/;

function Tip(props: TipType) {
  return (
    <>
      {props.tipTab && (
        <>
          <Divider />
          <br />
          <div>
            <span style={bold}>카테고리</span> 검색
          </div>
          <div>ex) cat:사회, cat:전산</div>
          <br />
          <div>
            <span style={bold}>전공</span> 검색
          </div>
          <div>ex) major:전자, major:컴퓨터 </div>
          <br />
          <Divider />
          <br />
        </>
      )}
    </>
  );
}

export default function CoursesPage(props: any) {
  const [rows, setRows] = useState<Array<CourseListType>>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [searchCount, setSearchCount] = useState<number>(0);
  const [tipTab, setTipTab] = useState<boolean>(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleTipTab = () => {
    setTipTab(!tipTab);
  };

  const handleChangeSearchInput = (event: any) => {
    setSearchInput(event.target.value);
  };

  const handleSearchButton = (event: any) => {
    const config = {
      withCredentials: true,
    };

    const result = regex.test(searchInput);
    console.log(result);

    const [cmd, keyword] = searchInput.split(":");
    const url =
      keyword == null
        ? BASE_URL + `/courses?keyword=${searchInput}`
        : BASE_URL + `/courses?keyword=${keyword}&command=${cmd}`;
    axios.get(url, config).then((res) => {
      const courseList = res.data.courses;
      setRows([...courseList]);
      if (courseList.length > 0) {
        setHasSearch(true);
      }
      setSearchCount(courseList.length);
    });
  };

  useLayoutEffect(() => {
    const url = `${BASE_URL}/courses/count`;
    axios.get(url).then((res) => {
      setTotalCount(res.data);
    });
  }, []);

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    const command = searchParams.get("command");

    if (keyword != null) {
      if (keyword.length < 2) {
        alert("2글자 이상 입력해주세요.");
        return;
      }
      const url =
        command == null
          ? BASE_URL + `/courses?keyword=${keyword}`
          : BASE_URL + `/courses?keyword=${keyword}&command=${command}`;
      const config = {
        withCredentials: true,
      };
      axios.get(url, config).then((res) => {
        const courseList = res.data.courses;
        setSearchCount(courseList.length);
        setHasSearch(true);
        setRows([...courseList]);
        setTipTab(false);
      });
    }
  }, []);

  const defaultNotice = `현재 ${totalCount}개의 수업이 등록되어 있습니다.`;
  const searchNotice = `${searchCount}개의 수업이 검색 되었습니다.`;
  return (
    <>
      <PageTemplate>
        {!hasSearch && (
          <>
            <h2 onClick={handleTipTab}>검색 방법</h2>
            <Tip tipTab={tipTab} />
          </>
        )}
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          justifyContent="center">
          <div>{hasSearch ? searchNotice : defaultNotice}</div>
          <Stack direction="row" spacing={1}>
            <SearchTypeSelection onChange={handleSearchTypeSelect} />
            {searchType != "major" ? (
              <SearchInput
                onChange={handleChangeSearchInput}
                value={searchInput}
                onKeyPress={handleOnKeyPress}
              />
            ) : (
              <MajorSelection
                onChange={handleMajorSelect}
                majorList={majorList}
              />
            )}
            <SearchButton onClick={handleSearchButton} />
          </Stack>
          {searchCount > 0 && (
            <Table rows={rows} columns={["과목명", "학수번호", "학점"]} />
          )}
        </Stack>
      </PageTemplate>
    </>
  );
}
