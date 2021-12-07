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

const BASE_URL = config.API_BASE_URL as string;

export interface LoginProps {}

const LoginBlock = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.1rem;
`;

const InputBlock = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
`;

const StyledInput = styled.input`
  width: 15rem;
  height: 4rem;
  margin: 0.1rem;
  border: 0.1rem black solid;
  font-size: inherit;

  padding: 1rem;

  ::-webkit-input-placeholder {
    transition: all 1s, color 0.5s;
  }

  ::placeholder {
    opacity: 1;
  }

  :focus {
    ::-webkit-input-placeholder {
      transition: all 1s, color 0.5s;
      color: transparent;
    }
  }

  :hover {
    ::-webkit-input-placeholder {
      transition: all 1.5s, color 0.5s;
      opacity: 0.3;
    }
  }

  border-radius: 0.5rem;
`;

const StyledButton = styled.button`
  width: 15rem;
  height: 4rem;
  margin: 0.1rem;
  border: 0.1rem black solid;

  cursor: pointer;
  color: #333;
  transition: all 0.9s, color 0.3s;
  font-size: inherit;
  :hover {
    box-shadow: 15rem 0 0 0 rgba(0, 0, 0, 1) inset;
    color: #ffe;
  }

  background-color: #c0c0c0;

  font-family: Noto Sans KR;
  font-weight: 900;
  border-radius: 0.5rem;
`;

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
    const data = { USER_ID: id, PASSWD: pw };
    const config = {
      withCredentials: true,
    };

    const request = axios
      .post(BASE_URL + "/auth/token", data, config)
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          dispatch(loginUser(res.data.id));
          navigate("/result");
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

  const onCookieCheckHandler = (e: any) => {
    const config = {
      withCredentials: true,
    };
    axios.get(BASE_URL + "/auth/token", config).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <LoginBlock onSubmit={onSubmitHandler}>
            <InputBlock>
              <StyledInput
                tabIndex={1}
                placeholder="학번을 입력하세요."
                onChange={onIdHandler}
              />
              <StyledInput
                tabIndex={2}
                type="password"
                placeholder="비밀번호를 입력하세요."
                onChange={onPwHandler}
              />
              <StyledButton type="submit" tabIndex={3}>
                로그인
              </StyledButton>
              <StyledButton type="button" onClick={onCookieCheckHandler}>
                쿠키
              </StyledButton>
            </InputBlock>
          </LoginBlock>
          {authAlert && (
            <React.Fragment>
              <br />
              <div>
                <a href="https://www.hongik.ac.kr/login.do"> 여기 </a> 에서
                로그인을 해주시고 다시 시도해주세요.
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
