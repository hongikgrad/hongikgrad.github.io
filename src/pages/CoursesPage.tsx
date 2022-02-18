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

const courseNameRegex = /^[가-힣a-zA-Z():]{2,}$/;
const courseNumberRegex = /^[0-9]{3,6}$/;

function SearchTypeSelection(props: any) {
  const onChange: () => void = props.onChange;
  const majorList = props.majorList;
  return (
    <StyledSelect name="major" onChange={onChange} width={6} height={4}>
      <option value="name">과목명</option>
      <option value="number">학수번호</option>
      <option value="major">전공</option>
    </StyledSelect>
  );
}

function MajorSelection(props: any) {
  const onChange: () => void = props.onChange;
  const majorList: any = props.majorList;
  return (
    <StyledSelect name="major" onChange={onChange} width={18} height={4}>
      {majorList.map((major: any, index: number) => {
        return (
          <option value={major.id} key={index}>
            {major.name}
          </option>
        );
      })}
    </StyledSelect>
  );
}

export default function CoursesPage(props: any) {
  const [rows, setRows] = useState<Array<any>>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [searchCount, setSearchCount] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchType, setSearchType] = useState<string>("name");

  const [majorList, setMajorList] = useState<Array<any>>([]);

  const [majorSelect, setMajorSelect] = useState<number>(1);

  const [isDirect, setIsDirect] = useState<boolean>(false);

  const handleChangeSearchInput = (e: any) => {
    setSearchInput(e.target.value);
  };

  const handleSearchButton = () => {
    search(searchType, searchInput);
  };

  const handleSearchTypeSelect = (e: any) => {
    setSearchType(e.target.value);
    setSearchInput("");
  };

  function handleMajorSelect(e: any) {
    setSearchInput(e.target.value);
  }

  const handleOnKeyPress = (e: any) => {
    if (e.key == "Enter") {
      handleSearchButton();
    }
  };

  const search = (type: string, keyword: string, year?: string) => {
    const input = keyword ? keyword : searchInput;
    if (type != "major" && type != "required" && input.length < 2) {
      alert("2글자 이상 입력해주세요.");
      return;
    }
    const url = `${API_BASE_URL}/courses?type=${type}&keyword=${input}&year=${year}`;
    axios.get(url, config).then((res) => {
      const result = res.data;
      const count = result.length;
      setSearchCount(count);
      setRows([...res.data]);
      setHasSearch(true);
    });
  };

  useLayoutEffect(() => {
    const url = `${API_BASE_URL}/courses/count`;
    axios.get(url).then((res) => {
      setTotalCount(res.data);
    });

    const majorListUrl = `${API_BASE_URL}/majors`;
    axios.get(majorListUrl, config).then((res) => {
      setMajorList([...res.data]);
    });
  }, []);

  const init = () => {
    // 직접 접근
    const keyword = searchParams.get("keyword");
    const type = searchParams.get("type");
    const year = searchParams.get("year");

    setSearchInput(keyword ? keyword : "");
    if (keyword != null) {
      setIsDirect(true);
      search(type ? type : "", keyword ? keyword : "", year ? year : "");
    }
  };

  useEffect(() => {
    init();
  }, []);

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
            {!isDirect && (
              <>
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
              </>
            )}
          </Stack>
          {searchCount > 0 && (
            <Table rows={rows} columns={["과목명", "학수번호", "학점"]} />
          )}
        </Stack>
      </PageTemplate>
    </>
  );
}
