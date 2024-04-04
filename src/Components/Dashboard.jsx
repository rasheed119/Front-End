import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import UseAdminStore from "../Store/AdminStore";

const Dashboard = () => {
  const { logout, getleave, leave } = UseAdminStore((store) => store);
  useEffect(() => {
    const fetch_pending_leave = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/auth/pending_leave"
        );
        getleave(response.data.pending_leave);
      } catch (error) {
        console.log(error, "USE_EFFECT_ERROR");
      }
    };
    fetch_pending_leave();
  }, []);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("admin");
        logout({});
        navigate("/");
      }
    });
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div
          className="col-md-3 col-xl-2 px-sm-2 px-0 bg-dark"
          style={{ width: "270px" }}
        >
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
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
                  to="/dashboard"
                  className="nav-link text-white px-0 d-flex align-items-center gap-2"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 d-flex align-items-center text-white gap-2"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Manage Employees
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/category"
                  className="nav-link px-0 d-flex align-items-center text-white gap-2"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/leave_requests"
                  className="nav-link px-0 d-flex align-items-center text-white gap-2"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Leave Request</span>
                  {leave.length > 0 && (
                    <span
                      style={{
                        backgroundColor: "white",
                        borderRadius: "50%",
                        color: "black",
                      }}
                      class="badge badge-info"
                    >
                      {leave.length}
                    </span>
                  )}
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/announcement"
                  className="nav-link px-0 d-flex align-items-center text-white gap-2"
                >
                  <i class="fs-4 bi-megaphone ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Announcement</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 d-flex align-items-center text-white gap-2">
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

export default Dashboard;
