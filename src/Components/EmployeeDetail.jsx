import React from "react";
import UseEmployeeStore from "../Store/EmployeeStore";

const EmployeeDetail = () => {
  const { name, email, address, salary, category, image } = UseEmployeeStore(
    (store) => store.data
  );
  return (
    <div>
      <div>
        <div class="container mt-5 d-flex justify-content-center card-details">
          <div class="card p-3">
            <div class="d-flex align-items-center details">
              <div class="image">
                <img
                  src={`http://localhost:3000/Images/` + image}
                  class="rounded"
                  width="250"
                />
              </div>
              <div class="ml-3 w-100">
                <h4 class="mb-0 mt-0">{name}</h4>
                <span>{category}</span>
                <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                  <div class="d-flex flex-column">
                    <span class="articles">Email</span>
                    <span class="number1">{email}</span>
                  </div>
                  <div class="d-flex flex-column">
                    <span class="followers">Address</span>
                    <span class="number2">{address}</span>
                  </div>

                  <div class="d-flex flex-column">
                    <span class="rating">Salary</span>
                    <span class="number3">{salary}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
