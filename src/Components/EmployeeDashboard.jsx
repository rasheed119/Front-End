import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import UseEmployeeStore from "../Store/EmployeeStore";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { logout } = UseEmployeeStore((store) => store);
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/employee/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("employee");
        logout();
        navigate("/");
      }
    });
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Code With Rasheed
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/employee/employee_detail"
                  className="nav-link px-0 d-flex align-items-center gap-2 text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  className="nav-link px-0 d-flex align-items-center gap-2 text-white"
                  to={"/employee/apply_leave"}
                >
                  <i class="fs-4 bi-person-fill-dash ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Apply Leave</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 d-flex align-items-center gap-2 text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Emoployee Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
