import React from "react";
import { useState, useLayoutEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import UseEmployeeStore from "../Store/EmployeeStore";
import TaskContainer from "./TaskContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

ChartJS.register(ArcElement, Tooltip, Legend);

const ToDo = () => {
  const [show, setShow] = useState(false);

  const { id } = UseEmployeeStore((store) => store.data);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [completed, setcompleted] = useState(0);
  const [pending, setpending] = useState(0);
  const [notcompleted, setnotcompleted] = useState(0);

  const not_completed_task = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/employee/task/notcompleted/${id}`
      );
      setnotcompleted(response.data.count.not_completed_task);
    } catch (error) {
      console.log(error);
    }
  };

  const pending_task = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/employee/task/pending/${id}`
      );
      setpending(response.data.count.pending_task);
      not_completed_task();
    } catch (error) {
      console.log(error, "pending task failed");
    }
  };

  const completed_task = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/employee/task/completed/${id}`
      );
      setcompleted(response.data.count.completed_task);
      pending_task();
    } catch (error) {
      console.log(error, "completed task failed");
    }
  };

  useLayoutEffect(() => {
    completed_task();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col lg={4}>
            <div className="card m-2 p-2 mx-auto" style={{ width: "20rem" }}>
              <h4>Task Summary</h4>
              <Doughnut
                className="mb-2"
                data={{
                  labels: ["Completed", "Pending", "Not Completed"],
                  datasets: [
                    {
                      label: "Tasks",
                      data: [completed, pending, notcompleted],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </Col>
          <Col lg={8}>
            <div
              className="card w-full overflow-scroll m-2 p-3 h-25"
              style={{ width: "90%" }}
            >
              <TaskContainer />
            </div>
          </Col>
        </Row>
      </Container>

      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas
        style={{ width: "40%" }}
        placement="end"
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ToDo;
