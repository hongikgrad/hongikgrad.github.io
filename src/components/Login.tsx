import { Console } from "console";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as config from "../config";
import { useNavigate } from "react-router";
import { loginUser } from "../modules/auth";
import Spinner from "./Spinner";
import Input from "./input/Input";
import Button from "./button/Button";
import { Stack } from "@mui/material";

const BASE_URL = config.API_BASE_URL as string;

export interface LoginProps {}

const LoginWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.1rem;
`;

function Notice(props: any) {
  return (
    <>
      <div style={{ width: "26rem" }}>
        <div>본 사이트는 아이디, 비밀번호를 수집하지 않습니다!</div>
        <div>
          Jsoup을 통해 얻어진 쿠키를 이용해 로그인 처리를 하며, 모든 코드는{" "}
          <a
            href="https://github.com/hongikgrad"
            target="_blank"
            rel="noopener noreferrer">
            GitHub
          </a>
          에 올라가 있습니다.
        </div>
      </div>
    </>
  );
}

export default function Login(props: LoginProps) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [authAlert, setAuthAlert] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = { USER_ID: id.toLowerCase(), PASSWD: pw };
    const config = {
      withCredentials: true,
    };

    axios
      .post(BASE_URL + "/auth/token", data, config)
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          dispatch(loginUser(res.data));
          navigate(-1);
        } else {
          setAuthAlert(true);
        }
      })
      .catch(() => {
        setAuthAlert(true);
        setLoading(false);
      });
  };

  const onIdHandler = (e: any) => {
    setId(e.target.value);
  };

  const onPwHandler = (e: any) => {
    setPw(e.target.value);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Notice />
          <LoginWrapper onSubmit={onSubmitHandler}>
            <Stack direction="column" spacing="0.5rem">
              <Input
                tabIndex={1}
                width={26}
                placeholder="학번을 입력하세요."
                onChange={onIdHandler}
              />
              <Input
                tabIndex={2}
                width={26}
                type="password"
                placeholder="비밀번호를 입력하세요."
                onChange={onPwHandler}
              />
              <Button type="submit" tabIndex={3} width={26}>
                로그인
              </Button>
            </Stack>
          </LoginWrapper>
          {authAlert && (
            <React.Fragment>
              <br />
              <div>계속해서 로그인에 실패하신다면</div>
              <div>
                <a href="https://www.hongik.ac.kr/login.do"> 여기 </a> 에서
                로그인을 해주시고 다시 시도해주세요.
              </div>
            </React.Fragment>
          )}
        </>
      )}
    </>
  );
}
