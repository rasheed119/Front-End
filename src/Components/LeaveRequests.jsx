import axios from "axios";
import React, { useEffect, useState } from "react";
import UseAdminStore from "../Store/AdminStore";
import LeaveRequestRows from "./LeaveRequestRows";
import Icon from "../assets/icon.png";

const LeaveRequests = () => {
  const Pending_Leave = UseAdminStore((store) => store.leave);
  var [searchTerm, setsearchTerm] = useState("");
  const [filterby, setfilterby] = useState("");
  const [leave_type, setleave_type] = useState("");
  const { getleave } = UseAdminStore((store) => store);
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
  const filter = Pending_Leave.filter((val) => {
    if (searchTerm === "" && leave_type === "" && filterby === "") {
      return val;
    } else if (
      val.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      val.type.includes(leave_type)
    ) {
      return val;
    }
  });
  const reset = () => {
    setfilterby("");
    setleave_type("");
    setsearchTerm("");
  };
  return (
    <div>
      {Pending_Leave.length === 0 ? (
        <>
          <div
            style={{ height: "70vh" }}
            className="d-flex flex-column gap-2 justify-content-center align-items-center"
          >
            <img
              src={Icon}
              alt="Icon"
              style={{ width: "100px", height: "100px" }}
            />
            <h2>No Pending Request Remaining</h2>
          </div>
        </>
      ) : (
        <>
          <div style={{ width: "100%" }}>
            <div
              className="mx-auto my-5 d-flex gap-2"
              style={{ width: "482px" }}
            >
              {/* Search Employee by their Name */}
              <input
                placeholder="Employee Name"
                value={searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
              />
              {/* Select What type of data want to Filter */}
              <select
                value={filterby}
                onChange={(e) => {
                  setfilterby(e.target.value);
                }}
              >
                <option
                  value=""
                  /* When the Filter by option is Clicked to Clear Leave Type */
                  onClick={() => {
                    setleave_type("");
                  }}
                >
                  Filter by
                </option>
                <option value="leave_type">Leave Type</option>
              </select>
              {/* Search Filter Functionality for Leave Type */}
              {filterby === "leave_type" && (
                <select
                  value={leave_type}
                  onChange={(e) => setleave_type(e.target.value)}
                >
                  <option value="">Select Leave Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Loss of Pay">Loss of Pay</option>
                  <option value="Casual Leave">Casual Leave</option>
                </select>
              )}
              <button
                className="btn rounded px-2 py-1"
                style={{
                  backgroundColor: "grey",
                  border: "none",
                  color: "white",
                }}
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </div>
          <table
            class="table table-striped mx-auto border shadow my-5"
            style={{ width: "90%" }}
          >
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Days</th>
                <th scope="col">Reason</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filter.map((leave, index) => (
                <LeaveRequestRows leave={leave} key={index} sno={index + 1} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default LeaveRequests;
