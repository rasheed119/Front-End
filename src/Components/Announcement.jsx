import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import UseAdminStore from "../Store/AdminStore";
import { toast } from "react-toastify";
import axios from "axios";

function Announcement() {
  const { id } = UseAdminStore((store) => store.data);
  const announcement_validation = yup.object().shape({
    title: yup.string().required("Title is required"),
    message: yup.string().required("Message is required"),
    important: yup.string(),
  });
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        title: "",
        message: "",
        important: false,
      },
      validationSchema: announcement_validation,
      onSubmit: async (data) => {
        try {
          await axios.post("http://localhost:3000/auth/create_announcement", {
            ...data,
            id,
          });
          values.title = "";
          values.message = "";
          toast.success("Announcement created successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } catch (error) {
          console.log(error.message);
          toast.error("Something went wrong");
        }
      },
    });
  return (
    <div style={{ width: "500px" }} className="mx-auto my-5">
      <h3 className="text-center mb-3">Announcement</h3>
      <Link
        to="/dashboard/announcement/history"
        className="d-flex justify-content-end"
      >
        See Announcement History...
      </Link>
      <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            className="rounded-1 px-2 py-1 w-100"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Title..."
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-100 rounded-2 px-2 py-1"
            placeholder="Announcement..."
            rows="10"
          />
        </div>
        <div className="d-flex gap-2">
          <input
            type="checkbox"
            checked={values.important}
            onBlur={handleBlur}
            name="important"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <span>Set as Important</span>
          {errors.important && touched.important && (
            <span className="text-danger">{errors.important}</span>
          )}
        </div>
        <button type="submit" className="btn btn-success">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Announcement;
