import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {formatdatetime} from "./Formatdatetime"



function EmAnnouncement() {
  const [announcement, setannouncement] = useState([]);
  const [modelannouncement, setmodelannouncement] = useState({});
  const [show, setShow] = useState(false);
  useEffect(() => {
    const get_anoouncement = async () => {
      const response = await fetch(
        "http://localhost:3000/employee/get_announcement"
      );
      const data = await response.json();
      setannouncement(data.announcements);
    };
    get_anoouncement();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setShow(true);
    setmodelannouncement(data);
  };
  return (
    <div>
      <h3 className="text-center my-3">Announcements</h3>
      <div
        style={{ height: "80vh" }}
        className="d-flex flex-wrap gap-4 w-75 mx-auto my-3 overflow-scroll hide-scrollbar"
      >
        {announcement &&
          announcement.map((data, index) => (
            <div
              className="card"
              key={index}
              style={{ width: "19rem", height: "12rem" }}
            >
              <div className="card-body d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title crop-text-1">{data.Title}</h5>
                  {data.important ? (
                    <i class="bi bi-info-circle-fill ms-2" on title="Important"></i>
                  ) : (
                    ""
                  )}
                </div>
                <p className="card-text crop-text-3">{data.message}</p>
                <a
                  href="#"
                  className="btn btn-primary"
                  onClick={() => handleShow(data)}
                >
                  Open Announcement
                </a>
              </div>
            </div>
          ))}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modelannouncement.Title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modelannouncement.message}</p>
          <Container>
            <Row>
              <Col className="text-end">
                <p style={{ fontFamily: "fantasy", fontStyle: "italic" }}>
                  Posted at : {formatdatetime(modelannouncement.created_at)},{" "}
                  {modelannouncement.created_by}
                </p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EmAnnouncement;
