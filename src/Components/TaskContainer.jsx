import axios from "axios";
import React, { useEffect, useState } from "react";
import UseEmployeeStore from "../Store/EmployeeStore";
import Table from "react-bootstrap/Table";
import dayjs from "dayjs";
import "./style.css";

const TaskContainer = () => {
  const [loading, setloading] = useState(false);
  const { id } = UseEmployeeStore((store) => store.data);
  const [tasks, setTasks] = useState([]);
  const format_date = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };
  useEffect(() => {
    const getTask = async () => {
      try {
        setloading(true);
        const response = await axios.get(
          `http://localhost:3000/employee/task/${id}`
        );
        setTasks(response.data.results);
        setloading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTask();
  }, []);
  return (
    <>
      <div>
        <h4>Tasks</h4>
      </div>
      <Table className="text-center " striped="columns">
        <thead>
          <tr>
            <th>Name</th>
            <th clas>Priority</th>
            <th>Due Date</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="">
          {/*           { loading && (
            )} */}

          {tasks.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.priority}</td>
              <td>{format_date(data.duedate)}</td>
              <td>{data.description}</td>
              <td>{data.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TaskContainer;
