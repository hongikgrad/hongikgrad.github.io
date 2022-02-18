import axios from "axios";
import styled from "styled-components";
import * as config from "../config";
import React, { useEffect, useLayoutEffect, useState } from "react";
import PageTemplate from "../components/PageTemplate";
import { Stack } from "@mui/material";

import SearchInput from "../components/input/SearchInput";
import SearchButton from "../components/button/SearchButton";
import Table from "../components/table/Table";
import Divider from "../components/Divider";
import { useSearchParams } from "react-router-dom";
import EditableCourseTable from "../components/table/EditableCourseTable";
import EditableMajorTable from "../components/table/EditableMajorTable";
import EditableMajorCourseTable from "../components/table/EditableMajorCourseTable";

const BASE_URL = config.API_BASE_URL as string;

interface Props {}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: any, number: number) => void;
}

const StyledSelect = styled.select<{ width?: number }>`
  width: ${({ width }) => (width ? width : 12)}rem;
  height: 2rem;
  text-align-last: center;
  text-align: center;
  border: 0.1rem black solid;
  font-size: 1rem;
  border-radius: 0.5rem;
  font-weight: 700;
`;

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

function MajorSelection(props: any) {
  const onChange: () => void = props.onChange;
  const majorList: any = props.majorList;
  return (
    <StyledSelect name="major" onChange={onChange}>
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

type majorType = {
  id: number;
  name: string;
  code: string;
  college: string;
};

export default function AdminPage(props: any) {
  const [rows, setRows] = useState<Array<CourseListType>>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [searchCount, setSearchCount] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const [majorList, setMajorList] = useState<any>([]);
  const [major, setMajor] = useState<majorType>();
  const [majorId, setMajorId] = useState<number>(1);
  const [changeToggle, setChangeToggle] = useState<boolean>(false);
  const config = {
    withCredentials: true,
  };

  const handleMajorSelection = (event: any) => {
    setMajorId(event.target.value);
  };

  const handleChangeSearchInput = (event: any) => {
    setSearchInput(event.target.value);
  };

  const handleSearchButton = (event: any) => {
    const config = {
      withCredentials: true,
    };
    searchInput.toUpperCase();

    const url = BASE_URL + `/admin/courses?keyword=${searchInput}`;
    axios.get(url, config).then((res) => {
      const courseList = res.data;
      setRows([...courseList]);
      if (courseList.length > 0) {
        setHasSearch(true);
      }
      setSearchCount(courseList.length);
    });
  };

  const handleAddMajorCourseButton = (majorId: number, courseId: number) => {
    const url = `${BASE_URL}/admin/majors/${majorId}/courses/${courseId}`;
    axios.post(url, config).then(() => {
      setChangeToggle(!changeToggle);
    });
  };

  const handleDeleteMajorCourse = (majorId: number, courseId: number) => {
    const url = BASE_URL + `/admin/majors/${majorId}/courses/${courseId}`;
    axios.delete(url, config).then(() => {
      setChangeToggle(!changeToggle);
    });
  };

  const handleAddMajorButton = (majorName: string) => {
    const url = `${BASE_URL}/admin/majors`;
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

  const handleSaveMajorButton = (
    majorId: number,
    input: { majorName: string; college: string },
    setEdit: (edit: number) => void
  ) => {
    const url = `${BASE_URL}/admin/majors/${majorId}`;
    const data = {
      name: input.majorName,
      college: input.college,
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

  const handleDeleteMajorButton = (majorId: number) => {
    const url = `${BASE_URL}/admin/majors/${majorId}`;
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

  useEffect(() => {
    /* 초기 렌더링 */
    const keyword = searchParams.get("keyword");
    const command = searchParams.get("command");

    /* 전공 리스트 불러오기 */
    // const majorListUrl = BASE_URL + `/admin/majors`;
    // axios.get(majorListUrl, config).then((res) => {
    //   setMajorList([...res.data]);
    // });

    /* 전공 과목 리스트 불러오기 */
    // const majorCourseListUrl = BASE_URL + `/admin/majors/${majorId}/courses`;
    // axios.get(majorCourseListUrl, config).then((res) => {
    //   setMajorCourseList([...res.data]);
    // });

    if (keyword != null) {
      if (keyword.length < 2) {
        alert("2글자 이상 입력해주세요.");
        return;
      }
      const url =
        command == null
          ? BASE_URL + `/courses?keyword=${keyword}`
          : BASE_URL + `/courses?keyword=${keyword}&command=${command}`;

      axios.get(url, config).then((res) => {
        const courseList = res.data.courses;
        setSearchCount(courseList.length);
        setHasSearch(true);
        setRows([...courseList]);
      });
    }
  }, []);

  return (
    <>
      <PageTemplate>
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          justifyContent="center">
          <EditableMajorTable
            rows={majorList}
            majorId={majorId}
            rowsHandler={setMajorList}
          />
          <MajorSelection
            majorList={majorList}
            onChange={handleMajorSelection}
          />
          <div>{major && major.name} 전공과목 리스트</div>
          <EditableMajorCourseTable
            majorId={majorId}
            handleDeleteButton={handleDeleteMajorCourse}
          />
          <Stack direction="row" spacing={1}>
            <SearchInput onChange={handleChangeSearchInput} />
            <SearchButton onClick={handleSearchButton} />
          </Stack>
          <EditableCourseTable
            majorId={majorId}
            handleAddButton={handleAddMajorCourseButton}
            rows={rows}
            columns={["과목명", "학수번호", "학점"]}
          />
        </Stack>
      </PageTemplate>
    </>
  );
}
