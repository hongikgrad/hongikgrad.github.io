import { Stack } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import Button from "../components/button/Button";
import TextButton from "../components/button/TextButton";
import PageTemplate from "../components/PageTemplate";
import Spinner from "../components/Spinner";
import Table from "../components/table/Table";
import { API_BASE_URL } from "../config";
import TitleButton from "../components/button/TitleButton";
import Divider from "../components/Divider";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";

interface Props {}

const config = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json",
  },
};

const bold = {
  fontWeight: 700,
};

const satisfied = {
  color: "black",
};

const notSatisfied = {
  color: "red",
};

const GraduationWrapper = styled.div`
  width: 26rem;
`;

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

function NotFound(props: any) {
  return <div style={{ width: "100%" }}>수강한 과목이 없습니다.</div>;
}

function MajorSelection(props: any) {
  const onChange: () => void = props.onChange;
  const majorList = props.majorList;
  return (
    <StyledSelect name="major" onChange={onChange} width={12}>
      <option value={-1}>전공을 선택해주세요.</option>
      {majorList.map((major: any, index: number) => {
        return (
          major.enable == 1 && (
            <option key={index} value={major.id}>
              {major.name}
            </option>
          )
        );
      })}
    </StyledSelect>
  );
}

function AbeekSelection(props: any) {
  const onChange: () => void = props.onChange;
  return (
    <StyledSelect name="abeek" onChange={onChange} width={5}>
      <option value="false">비공학</option>
      <option value="true">공학</option>
    </StyledSelect>
  );
}

function EnterYearSelection(props: any) {
  const onChange: () => void = props.onChange;
  return (
    <StyledSelect onChange={onChange} width={4}>
      <option value="16">16</option>
      <option value="17">17</option>
      <option value="18">18</option>
      <option value="19">19</option>
      <option value="20">20</option>
      <option value="21">21</option>
      <option value="22">22</option>
    </StyledSelect>
  );
}

function CourseList(props: any) {
  const courses = props.courses;
  return (
    <>
      {courses && courses.length > 0 ? (
        <Table rows={courses} columns={["강의명", "학수번호", "학점"]} />
      ) : (
        <NotFound />
      )}
    </>
  );
}

function SubField(props: any) {
  const subfield = props.subfield;
  return (
    <>
      {subfield &&
        subfield.map((field: any, index: number) => {
          const courses: any = field.courseList;
          const url: string = field.url;
          return (
            <Stack
              key={index}
              alignItems="flex-start"
              spacing="1rem"
              width="100%">
              <a href={url} target="_blank" rel="noreferrer noopener">
                <h3>{field.field}</h3>
              </a>
              <div>{field.totalCredit}학점 수강</div>
              <CourseList courses={courses} />
              <br />
              <br />
            </Stack>
          );
        })}
    </>
  );
}

function GraduationRequirements(props: any) {
  const requirements = props.requirements;

  return (
    <>
      {requirements.map((req: any, index: number) => {
        const subfield: any = req.subField;
        return (
          <Stack alignItems="center" key={index} width="100%">
            <div style={req.isSatisfied ? satisfied : notSatisfied}>
              <h2>{req.mainField}</h2>
              <div>
                <span style={bold}>{req.totalCredit}</span>학점 수강
              </div>
              <br />
            </div>
            <div
              className="briefing"
              style={req.isSatisfied ? satisfied : notSatisfied}>
              <div>{req.briefing}</div>
            </div>
            <div className="subfields" style={{ width: "100%" }}>
              <SubField subfield={subfield} />
            </div>
            <br />
            <Divider />
          </Stack>
        );
      })}
    </>
  );
}

export default function GraduationPage(Props: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const loadingRef = useRef(loading);
  loadingRef.current = loading;
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalCredit, setTotalCredit] = useState<number>(0);
  const [courses, setCourses] = useState<any>([]);
  const [takenCourseTab, setOpenCourseTab] = useState<boolean>(true);
  const [graduationCheckTab, setGraduationCheckTab] = useState<boolean>(false);

  const [majorId, setMajorId] = useState<number>(-1);
  const [majorList, setMajorList] = useState<Array<any>>([]);
  const [abeek, setAbeek] = useState<string>("false");
  const [requirements, setRequirements] = useState<any>([]);
  const [isDone, setDone] = useState<boolean>(false);
  const [load, setLoad] = useState<number>(0);
  const [enterYear, setEnterYear] = useState<number>(16);
  const authCookieData = useSelector(
    (state: RootState) => state.auth.authCookie
  );

  const handleTakenCourseTab = () => {
    setOpenCourseTab(!takenCourseTab);
  };

  const handleGraduationCheckTab = () => {
    setGraduationCheckTab(!graduationCheckTab);
  };

  const handleMajorSelect = (e: any) => {
    setMajorId(e.target.value);
  };

  const handleAbeekSelect = (e: any) => {
    setAbeek(e.target.value);
  };

  const handleEnterYearSelect = (e: any) => {
    setEnterYear(e.target.value);
  };

  const handleLoadButton = async () => {
    await requestUserCourse();
    alert("과복 불러오기 성공!");
  };

  const handleGraduationCheckButton = async () => {
    const url = `${API_BASE_URL}/users/graduation`;
    const data = {
      majorId: majorId,
      isAbeek: abeek,
      courseList: courses,
      enterYear: enterYear,
    };
    if (majorId != -1) {
      const response = await axios.post(url, data, config);
      setRequirements([...response.data]);
      setGraduationCheckTab(true);
      setDone(true);
    } else {
      alert("전공을 선택해주세요.");
    }
  };

  const requestUserCourse = async () => {
    const url = API_BASE_URL + `/users/courses`;
    try {
      const res = await axios.post(url, authCookieData, config);
      setCourses([...res.data.courses]);
      setTotalCount(res.data.totalCount);
      setTotalCredit(res.data.totalCredit);
      setLoad(load + 1);
      setLoading(false);
    } catch (e: any) {
      const res = await axios.post(url, authCookieData, config);
      setCourses([...res.data.courses]);
      setTotalCount(res.data.totalCount);
      setTotalCredit(res.data.totalCredit);
      setLoad(load + 1);
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (loadingRef.current) {
        alert("서버와의 통신이 원할하지 않습니다.");
        navigate(-1);
      }
    }, 3000);

    const url = `${API_BASE_URL}/majors`;
    axios.get(url, config).then((res) => {
      setMajorList([...res.data]);
    });
    requestUserCourse();
  }, []);

  return (
    <>
      <PageTemplate>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Stack spacing="1rem" justifyContent="center" alignItems="center">
              <Stack
                direction="row"
                justifyContent="center"
                spacing="0.1rem"
                width="100%">
                <EnterYearSelection onChange={handleEnterYearSelect} />
                <MajorSelection
                  onChange={handleMajorSelect}
                  majorList={majorList}
                />
                <AbeekSelection onChange={handleAbeekSelect} />
                <Button
                  onClick={handleGraduationCheckButton}
                  color="#fff"
                  width={6}
                  height={2}>
                  검사하기
                </Button>
              </Stack>
              <GraduationWrapper>
                <TitleButton onClick={handleGraduationCheckTab}>
                  <h1>졸업 요건</h1>
                </TitleButton>
                {load == 0 && (
                  <div>
                    <span style={bold}>수강 과목 불러오기</span> 버튼을
                    눌러주세요!
                  </div>
                )}
                {!isDone && (
                  <>
                    <div>
                      학과와 (공학/비공학) 여부를 선택하신 후 <br />
                      <span style={bold}>검사하기</span> 버튼을 눌러주세요!
                    </div>
                    <br />
                  </>
                )}
                {graduationCheckTab && (
                  <>
                    <GraduationRequirements requirements={requirements} />
                  </>
                )}
              </GraduationWrapper>
              <TitleButton onClick={handleTakenCourseTab}>
                <h1>수강 과목</h1>
              </TitleButton>
              {takenCourseTab && (
                <>
                  <div>
                    <span style={bold}>{totalCount}</span>
                    개의 강의를 수강하셨고{" "}
                    <span style={bold}>{totalCredit}</span>
                    학점을 들으셨습니다.
                  </div>
                  <Table
                    rows={courses}
                    columns={["강의명", "학수번호", "학점"]}
                  />
                  {load == 0 && (
                    <Button
                      width={26}
                      color="#e5e5e5"
                      onClick={handleLoadButton}>
                      수강 과목 불러오기
                    </Button>
                  )}
                </>
              )}
            </Stack>
          </>
        )}
      </PageTemplate>
    </>
  );
}
