import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const employeestore = (set) => ({
  data: {
    id: "",
    name: "",
    email: "",
    address: "",
    salary: 0,
    image: "",
    category: "",
  },
  login: (employeedata) =>
    set(() => ({
      data: employeedata,
    })),
  logout: () =>
    set(() => ({
      data: {},
    })),
});

const UseEmployeeStore = create(
  devtools(
    persist(employeestore, {
      name: "Employee",
    })
  )
);

export default UseEmployeeStore;
