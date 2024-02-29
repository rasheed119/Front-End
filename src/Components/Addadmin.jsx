import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const addadmin_validation = yup.object().shape({
  name: yup.string().required("Admin is Reduired"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is Required")
    .min(6, "Minimum 6 characters Required"),
  password: yup
    .string()
    .required("Password is  Required")
    .min(8, "Minimum 8 Characters Required"),
});

const Addadmin = () => {
  const [Loading, setloading] = useState(false);
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: addadmin_validation,
      onSubmit: async (data) => {
        try {
          setloading(true);
          await axios.post("http://localhost:3000/auth/add_admin", data);
          toast.success("Admin Added Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
          setloading(false);
        } catch (error) {
          setloading(false);
          if (error.response.data.error.code === "ER_DUP_ENTRY") {
            toast.error("Admin already exsist", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
          console.log(error);
        }
      },
    });

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Admin</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={handleChange}
              value={values.name}
              name="name"
              onBlur={handleBlur}
            />
            {errors.name && touched.name && (
              <p className="text-danger">{errors.name}</p>
            )}
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              onChange={handleChange}
              value={values.email}
              name="email"
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className="text-danger">{errors.email}</p>
            )}
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={handleChange}
              value={values.password}
              name="password"
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <p className="text-danger">{errors.password}</p>
            )}
          </div>
          <div className="col-12">
            <button
              type="submit"
              className={`btn btn-primary w-100 ${
                Loading &&
                "d-flex gap-2 justify-content-center align-items-center"
              } `}
              disabled={Loading}
            >
              {Loading ? (
                <>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span>Loading...</span>
                </>
              ) : (
                "Add Admin"
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Addadmin;
