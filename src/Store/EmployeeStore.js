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
  History: false,
  login: (employeedata) =>
    set(() => ({
      data: employeedata,
    })),
  logout: () =>
    set(() => ({
      data: {},
    })),
  pagechange: () =>
    set((state) => ({
      History: !state.History,
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
