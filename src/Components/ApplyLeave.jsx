import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseEmployeeStore from "../Store/EmployeeStore";

const ApplyLeave = () => {
  const { id } = UseEmployeeStore((store) => store.data);
  const [Date, setdate] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Date);
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center apply-leave-form">
        <div className="p-3 rounded w-50 border">
          <h3 className="text-center">Apply Leave</h3>
          <form className="row g-1" onSubmit={handleSubmit}>
            <div className="col-12">
              <label className="form-label">Leave Type</label>
              <select className="col-12 leave-type">
                <option>Sick Leave</option>
                <option>Casual Leave</option>
                <option>Loss of Pay</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label">From Date</label>
              <input
                type="date"
                className="form-control rounded-0"
                value={Date}
                onChange={(d) => setdate(d.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">To Date</label>
              <input type="date" className="form-control rounded-0" />
            </div>
            <div className="col-12">
              <label className="form-label">Contact Details</label>
              <input type="text" className="form-control rounded-0" />
            </div>
            <div className="col-12">
              <label className="form-label">Enter Reason</label>
              <textarea
                type="text"
                className="form-control rounded-0 leave-reason"
              />
            </div>
            <div className="col-12 leave-submit">
              <button
                type="submit"
                className={`btn btn-primary w-50 apply-submit-button`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeave;
