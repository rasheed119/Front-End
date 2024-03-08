import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseEmployeeStore from "../Store/EmployeeStore";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LeaveHistory from "./LeaveHistory";
import "react-toastify/dist/ReactToastify.css";

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

const today_Date = `${year}-${month}-${day}`;

const leave_form_validation = yup.object().shape({
  type: yup.string().required("Type is Required"),
  //Setting Date validation , For From date : users can select the date from today and not from yesterday
  From: yup
    .date()
    .required("From Date is Required")
    .min(today_Date, "Leave Date must not be from past Date"),
  //For To Date : Users Cannot select the date from the FROM DATE and Beyond the FROM DATE
  To: yup
    .date()
    .required("To date is required")
    .min(yup.ref("From"), "To date must be after from `From` date"),
  Contact: yup
    .string()
    .required("Contact is Required")
    .min(10, "Minimum 10 Characters Required"),
  Reason: yup.string().required("Reason is Required"),
});

const ApplyLeave = () => {
  const { id } = UseEmployeeStore((store) => store.data);
  const [Loading, setLoading] = useState(false);
  const { History, pagechange } = UseEmployeeStore((store) => store);

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        type: "",
        From: "",
        To: "",
        Contact: "",
        Reason: "",
      },
      validationSchema: leave_form_validation,
      onSubmit: async (data) => {
        try {
          setLoading(true);
          const response = await axios.post(
            "http://localhost:3000/employee/apply_leave",
            {
              ...data,
              employee_id: id,
            }
          );
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          values.type = "";
          values.Contact = "";
          values.From = "";
          values.To = "";
          values.Reason = "";
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error.message);
        }
      },
    });

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center apply-leave-form flex-column">
        <div className="d-flex my-3">
          <button
            className={`text-decoration-none text-black border ${
              !History && `bg-primary text-white`
            } border-primary px-2 py-1 rounded-start`}
            onClick={() => pagechange()}
          >
            Apply Form
          </button>
          <button
            onClick={() => pagechange()}
            className={`text-decoration-none text-black border ${
              History && `bg-primary text-white`
            } border-primary px-2 py-1 rounded-end`}
          >
            Leave History
          </button>
        </div>
        {!History && (
          <div className="p-3 rounded w-50 border">
            <h3 className="text-center">Apply Leave</h3>
            <form className="row g-1" onSubmit={handleSubmit}>
              <div className="col-12">
                <label className="form-label">Leave Type</label>
                <select
                  className="col-12 leave-type"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="type"
                >
                  <option>Select Leave Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Loss of Pay">Loss of Pay</option>
                </select>
                {errors.type && touched.type && (
                  <p className="text-danger">{errors.type}</p>
                )}
              </div>
              <div className="col-6">
                <label className="form-label">From Date</label>
                <input
                  type="date"
                  className="form-control rounded-0"
                  value={values.From}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="From"
                />
                {errors.From && touched.From && (
                  <p className="text-danger">{errors.From}</p>
                )}
              </div>
              <div className="col-6">
                <label className="form-label">To Date</label>
                <input
                  type="date"
                  className="form-control rounded-0"
                  value={values.To}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="To"
                />
                {errors.To && touched.To && (
                  <p className="text-danger">{errors.To}</p>
                )}
              </div>
              <div className="col-12">
                <label className="form-label">Contact Details</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Contact}
                  name="Contact"
                />
                {errors.Contact && touched.Contact && (
                  <p className="text-danger">{errors.Contact}</p>
                )}
              </div>
              <div className="col-12">
                <label className="form-label">Enter Reason</label>
                <textarea
                  type="text"
                  className="form-control rounded-0 leave-reason p-1"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Reason}
                  name="Reason"
                />
                {errors.Reason && touched.Reason && (
                  <p className="text-danger">{errors.Reason}</p>
                )}
              </div>
              <div className="col-12 leave-submit">
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
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
        {History && <LeaveHistory />}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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

export default ApplyLeave;
