import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import * as config from "../config";

const BASE_URL = config.API_BASE_URL as string;

export interface ResultProps {}

export default function Result(props: ResultProps) {
  const config = {
    withCredentials: true,
  };
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(BASE_URL + "/courses", config)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setCourses(res.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  });
  return (
    <React.Fragment>
      RESULT
      <div>{courses}</div>
    </React.Fragment>
  );
}
