import axios from "axios";
import React, { useEffect, useState } from "react";
import UseAdminStore from "../Store/AdminStore";
import Requesrrows from "./LeaveRequestRows";
import Icon from "../assets/icon.png";

const LeaveRequests = () => {
  const Pending_Leave = UseAdminStore((store) => store.leave);
  const { getleave } = UseAdminStore((store) => store);
  useEffect(() => {
    const fetch_pending_leave = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/auth/pending_leave"
        );
        getleave(response.data.pending_leave);
      } catch (error) {
        console.log(error);
      }
    };
    fetch_pending_leave();
  }, []);
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
              <th scope="col">Reason</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Pending_Leave.map((leave, index) => (
              <Requesrrows leave={leave} key={index} sno={index + 1} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveRequests;
