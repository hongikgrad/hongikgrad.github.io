import { Console } from "console";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export interface LoginProps {}

const LoginBlock = styled.form`
  display: flex;
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
    box-shadow: 15rem 0 0 0 rgba(0, 0, 0, 0.5) inset;
    color: #fff;
  }

  background-color: #c0c0c0;

  font-family: Noto Sans KR;
  font-weight: 900;
  border-radius: 0.5rem;
`;

export default function Login(props: LoginProps) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    const url = "https://localhost:8080/hello";
    axios.get(url).then((res) => {
      console.log(res);
      alert(res);
    });
  };

  const onIdHandler = (e: any) => {
    setId(e.target.value);
  };

  const onPwHandler = (e: any) => {
    setPw(e.target.value);
  };
  return (
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
      </InputBlock>
    </LoginBlock>
  );
}
