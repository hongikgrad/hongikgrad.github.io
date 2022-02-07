import axios from "axios";
import qs from "qs";
import * as config from "../config";

const LOGIN_USER = "USER/login_user";
const LOGOUT_USER = "USER/logout_user";
const AUTH_USER = "USER/auth";

const BASE_URL = config.API_BASE_URL as string;

// type LoginDataProps = {
//   USER_ID: string;
// };

type LoginDataProps = {
  isLogin: boolean;
};

export function loginUser() {
  return {
    type: LOGIN_USER,
    // payload: isLogin,
  };
}

export function logoutUser() {
  // const request = axios.delete(`auth/token`).then((response) => response.data);

  return {
    type: LOGOUT_USER,
    // payload: false,
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
};

const initialState: AuthState = {
  state: false,
  isLogin: false,
};

export default function (state: AuthState = initialState, action: AuthAction) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, isLogin: true };
    // case AUTH_USER:
    //   return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state, isLogin: false };
    default:
      return state;
  }
}
