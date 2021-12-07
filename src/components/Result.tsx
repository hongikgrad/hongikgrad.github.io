import axios from "axios";
import * as React from "react";
import { useLayoutEffect, useEffect, useState } from "react";
import * as config from "../config";
import Spinner from "./Spinner";
import Table from "./Table";

const BASE_URL = config.API_BASE_URL as string;

export interface ResultProps {}

export default function Result(props: ResultProps) {
  const config = {
    withCredentials: true,
  };
  const [Courses, setCourses] = useState<any>([]);
  const [Render, setRender] = useState(false);
  useLayoutEffect(() => {
    axios
      .get(BASE_URL + "/courses", config)
      .then((res) => {
        setCourses([...res.data]);
        setRender(true);
      })
      .catch((errors) => {
        console.log(errors);
      });
  }, []);
  return (
    <React.Fragment>
      {!Render ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <Table>
            <caption>이수 수업</caption>
            <br />
            <tr>
              <th>학수번호</th>
              <th>수업이름</th>
              <th>학점</th>
            </tr>
            {Courses.map((course: any, index: any) => {
              return (
                <tr key={index}>
                  <td key={index}>{course.number}</td>
                  <td key={index}>{course.name}</td>
                  <td key={index}>{course.credit}</td>
                </tr>
              );
            })}
          </Table>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
