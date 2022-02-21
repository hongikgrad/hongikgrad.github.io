import axios from "axios";
import qs from "qs";
import * as config from "../config";

const LOGIN_USER = "USER/login_user";
const LOGOUT_USER = "USER/logout_user";
const AUTH_USER = "USER/auth";

type AuthCookieProps = {
  JSESSIONID: string;
  SUSER_AUTH: string;
  SUSER_AUTHKEY: string;
  SUSER_EXTAUTH: string;
  SUSER_GUBUN: string;
  SUSER_ID: string;
  SUSER_LAST: string;
  SUSER_LAST_IP: string;
  SUSER_LIMIT: string;
  SUSER_LOGID: string;
  SUSER_LOGKEY: string;
  SUSER_NAME: string;
  WMONID: string;
  hongik_abeek_sso: string;
};

export function loginUser(authCookieData: AuthCookieProps) {
  return {
    type: LOGIN_USER,
    payload: authCookieData,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

export function auth() {
  const request = axios.get(`auth/token`).then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

type AuthAction =
  | ReturnType<typeof loginUser>
  | ReturnType<typeof logoutUser>
  | ReturnType<typeof auth>;

type AuthState = {
  state: boolean;
  isLogin: boolean;
  authCookie: AuthCookieProps;
};

const initialState: AuthState = {
  state: false,
  isLogin: false,
  authCookie: {
    JSESSIONID: "",
    SUSER_AUTH: "",
    SUSER_AUTHKEY: "",
    SUSER_EXTAUTH: "",
    SUSER_GUBUN: "",
    SUSER_ID: "",
    SUSER_LAST: "",
    SUSER_LAST_IP: "",
    SUSER_LIMIT: "",
    SUSER_LOGID: "",
    SUSER_LOGKEY: "",
    SUSER_NAME: "",
    WMONID: "",
    hongik_abeek_sso: "",
  },
};

export default function (state: AuthState = initialState, action: any) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, isLogin: true, authCookie: action.payload };
    case LOGOUT_USER:
      return { ...state, isLogin: false, authCookie: initialState.authCookie };
    default:
      return state;
  }
}
