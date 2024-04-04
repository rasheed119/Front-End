import axios from "axios";
import React, { useEffect, useState, useTransition } from "react";
import UseAdminStore from "../Store/AdminStore";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { formatdatetime } from "./Formatdatetime";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function AnnouncementHistory() {
  const { id } = UseAdminStore((store) => store.data);
  const [data, setdata] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteShowmodal, setdeleteShowModal] = useState(false);
  const [editannouncement, seteditannouncement] = useState({});
  const [deleteid, setdeleteid] = useState(0);


  const handledeleteShow = (id) => {
    setdeleteShowModal(true);
    setdeleteid(id);
  };
  const handledeleteClose = () => setdeleteShowModal(false);
  const handleClose = () => setShow(false);

  const handleShow = (value) => {
    setShow(true);
    seteditannouncement(value);
  };

  useEffect(() => {
    const get_announcement = async () => {
      const response = await axios.get(
        `http://localhost:3000/auth/getAnnouncement/${id}`
      );
      setdata(response.data.announcements);
    };
    get_announcement();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "title" || e.target.name === "message") {
      seteditannouncement({
        ...editannouncement,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.type === "checkbox") {
      seteditannouncement({
        ...editannouncement,
        [e.target.name]: e.target.checked ? 1 : 0,
      });
    }
  };

  const edit_announcement_data = async (edited_announcement) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/auth/edit_announcement",
        edited_announcement
      );
      setdata((data) =>
        data.map((value) => {
          if (value.id === edited_announcement.id) {
            return response.data.result[0];
          }
          return value;
        })
      );
      toast.success("Announcement Updated Successfully");
      setShow(false);
    } catch (error) {
      toast.error("An error occurred");
      console.log(error.message);
    }
  };

  const delete_announcement_data = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/auth/delete_announcement/${deleteid}`
      );
      setdata((data) => data.filter((value) => value.id !== deleteid));
      toast.success("Announcement Deleted Successfully");
      setdeleteShowModal(false);
      setShow(false);
    } catch (error) {
      toast.error("Error occured while deleting announcement");
      console.log(error.message);
    }
  };

  return (
    <>
      {data.length === 0 && (
        <div className="d-flex justify-content-center align-items-center h-75">
          <div className="d-flex flex-column align-items-center gap-3">
            <h5 className="text-center">
              You have not Created any Announcement yet
            </h5>
            <Link className="btn btn-primary" to={"/dashboard/announcement"}>
              {" "}
              <i class="bi bi-plus"></i> Create New Announcement
            </Link>
          </div>
        </div>
      )}
      <div
        className="d-flex flex-wrap gap-4 w-75 mx-auto my-3 overflow-scroll hide-scrollbar"
        style={{ height: "80vh" }}
      >
        {data.map((value, index) => (
          <Card
            key={index}
            className="mx-auto my-3"
            style={{ width: "80%", height: "200px" }}
          >
            <Card.Header className="d-flex align-items-center justify-content-between">
              <h5 className="crop-text-1" style={{width : "550px"}}>{value.title}</h5>
              <h6>{formatdatetime(value.created_at)}</h6>
            </Card.Header>
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Text className="crop-text-3">{value.message}</Card.Text>
              <div className="d-flex gap-2">
                <Button variant="primary" onClick={() => handleShow(value)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handledeleteShow(value.id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
        {/* Edit Modal */}
        <Modal show={show} backdrop="static" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Announcement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  autoFocus
                  value={editannouncement.title}
                  name="title"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  value={editannouncement.message}
                  rows={5}
                  name="message"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  name="important"
                  type="checkbox"
                  checked={editannouncement.important === 1 ? true : false}
                  onChange={(e) => handleChange(e)}
                  label="Set as Important"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => edit_announcement_data(editannouncement)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Delete Modal */}
        <Modal
          show={deleteShowmodal}
          onHide={handledeleteClose}
          backdrop="static"
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are You Sure , want to delete this announcement
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={delete_announcement_data}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default AnnouncementHistory;
