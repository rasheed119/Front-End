import React, { useEffect, useState } from "react";
import UseEmployeeStore from "../Store/EmployeeStore";
import axios from "axios";
import dayjs from "dayjs";

function LeaveHistory() {
  const { id } = UseEmployeeStore((store) => store.data);
  const [LeaveHistory, setLeaveHistory] = useState([]);
  const [searcstatus, setsearchstatus] = useState("");
  const [filterby, setfilterby] = useState("");
  const [leavetype, setleavetype] = useState("");
  useEffect(() => {
    const fetch_leave_history = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/employee/leave_history/${id}`
        );
        setLeaveHistory(response.data.leave_history);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetch_leave_history();
  }, []);
  const format_date = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const total_days = (start, end) => {
    const start_date = dayjs(start);
    const end_Date = dayjs(end);
    return end_Date.diff(start_date, "days");
  };

  const filter_leave_history = LeaveHistory.filter((history) => {
    if (searcstatus === "" && filterby === "" && leavetype === "") {
      return history;
    } else if (
      history.Status.includes(searcstatus) &&
      history.type.includes(leavetype)
    ) {
      return history;
    }
  });
  const reset = () => {
    setfilterby("");
    setleavetype("");
    setsearchstatus("");
  };
  return (
    <div className="d-flex gap-2 flex-column w-75">
      <div className="d-flex justify-content-end gap-2">
        <select value={filterby} onChange={(e) => setfilterby(e.target.value)}>
          <option value="">Filter by</option>
          <option value="Status">Status</option>
          <option value="type">Leave Type</option>
        </select>
        {filterby === "Status" && (
          <select
            value={searcstatus}
            onChange={(e) => setsearchstatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Declined">Declined</option>
          </select>
        )}
        {filterby === "type" && (
          <select
            value={leavetype}
            onChange={(e) => setleavetype(e.target.value)}
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Loss of Pay">Loss of Pay</option>
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
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Leave Type</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Days</th>
            <th scope="col">Reason</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {filter_leave_history.map((leave, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{leave.type}</td>
              <td>{format_date(leave.From)}</td>
              <td>{format_date(leave.To)}</td>
              <td>
                {total_days(format_date(leave.From), format_date(leave.To))} d
              </td>
              <td>{leave.Reason}</td>
              <td
                className={`${
                  leave.Status === "Approved" &&
                  "text-white bg-success rounded text-center"
                } ${
                  leave.Status === "Declined" &&
                  "text-white bg-danger rounded text-center"
                }`}
              >
                {leave.Status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveHistory;
