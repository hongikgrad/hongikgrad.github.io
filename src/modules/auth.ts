import axios from "axios";
import qs from "qs";
import * as config from "../config";

const LOGIN_USER = "USER/login_user";
const LOGOUT_USER = "USER/logout_user";
const AUTH_USER = "USER/auth";

const BASE_URL = config.API_BASE_URL + "";

export function loginUser(data: any, config: any) {
  const request = axios
    .post(BASE_URL + "/auth/token", data, config)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      return res.data;
    });

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .delete(`api/auth/token`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios.get(`api/auth/token`).then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export default function (state = {}, action: any) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, isLogin: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
}
