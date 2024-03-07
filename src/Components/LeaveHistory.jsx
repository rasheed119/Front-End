import React, { useEffect, useState } from "react";
import UseEmployeeStore from "../Store/EmployeeStore";
import axios from "axios";
import dayjs from "dayjs";

function LeaveHistory() {
  const { id } = UseEmployeeStore((store) => store.data);
  const [LeaveHistory, setLeaveHistory] = useState([]);
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
  return (
    <div className="d-flex gap-2 flex-column w-75">
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
          {LeaveHistory.map((leave, index) => (
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
