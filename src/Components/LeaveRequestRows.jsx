import React, { useState } from "react";
import UseAdminStore from "../Store/AdminStore";
import dayjs from "dayjs";
import axios from "axios";

function LeaveRequestRows({ leave, sno }) {
  const [ApproveLoading, setApproveLoading] = useState(false);
  const [DeclineLoading, setDeclineLoading] = useState(false);
  const admin_id = UseAdminStore((store) => store.data.id);
  const { remove_leave } = UseAdminStore((store) => store);
  const format_date = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };
  const approve_leave = async (id) => {
    try {
      setApproveLoading(true);
      await axios.post("http://localhost:3000/employee/update_leave", {
        status_msg: "Approved",
        admin_id,
        id,
      });
      remove_leave(id);
    } catch (error) {
      setApproveLoading(false);
      console.log(error);
    }
  };
  const decline_leave = async (id) => {
    try {
      setDeclineLoading(true);
      await axios.post("http://localhost:3000/employee/update_leave", {
        status_msg: "Declined",
        admin_id,
        id,
      });
      remove_leave(id);
    } catch (error) {
      setDeclineLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <tr>
        <th scope="row">{sno}</th>
        <td>{leave.name}</td>
        <td>{leave.type}</td>
        <td>{format_date(leave.From)}</td>
        <td>{format_date(leave.To)}</td>
        <td>{leave.Reason}</td>
        <td>
          <div className="d-flex gap-2">
            <button
              className="px-2 rounded"
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                width: "90px",
              }}
              disabled={ApproveLoading}
              onClick={() => approve_leave(leave.id)}
            >
              {ApproveLoading ? (
                <>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
              ) : (
                "Approve"
              )}
            </button>
            <button
              className="px-2 rounded"
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                width: "90px",
              }}
              disabled={DeclineLoading}
              onClick={() => decline_leave(leave.id)}
            >
              {DeclineLoading ? (
                <>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
              ) : (
                "Decline"
              )}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default LeaveRequestRows;
