import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Employee from "./Components/Employee";
import Category from "./Components/Category";
import LeaveRequests from "./Components/LeaveRequests";
import AddCategory from "./Components/AddCategory";
import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";
import Start from "./Components/Start";
import EmployeeLogin from "./Components/EmployeeLogin";
import EmployeeDetail from "./Components/EmployeeDetail";
import PrivateRoute from "./Components/PrivateRoute";
import EditAdmin from "./Components/EditAdmin";
import Addadmin from "./Components/Addadmin";
import ApplyLeave from "./Components/ApplyLeave";
import EmployeeDashboard from "./Components/EmployeeDashboard";
import LeaveHistory from "./Components/LeaveHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/employee_login" element={<EmployeeLogin />}></Route>
        <Route path="/employee" element={<EmployeeDashboard />}>
          <Route
            path="/employee/employee_detail"
            element={<EmployeeDetail />}
          />
          <Route path="/employee/apply_leave" element={<ApplyLeave />} />
          <Route path="/employee/leave_history" element={<LeaveHistory />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/leave_requests" element={<LeaveRequests />}></Route>
          <Route
            path="/dashboard/add_category"
            element={<AddCategory />}
          ></Route>
          <Route
            path="/dashboard/add_employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/dashboard/edit_employee/:id"
            element={<EditEmployee />}
          ></Route>
          <Route path="/dashboard/edit_admin" element={<EditAdmin />}></Route>
          <Route path="/dashboard/add_admin" element={<Addadmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
