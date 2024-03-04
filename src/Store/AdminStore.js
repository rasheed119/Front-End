import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const adminstore = (set) => ({
  data: {
    id: "",
    Name: "",
    email: "",
  },
  login: (admindata) =>
    set(() => ({
      data: admindata,
    })),
  update: (updated_data) =>
    set(() => ({
      data: updated_data,
    })),
  logout: () =>
    set(() => ({
      data: {},
    })),
});

const UseAdminStore = create(
  devtools(
    persist(adminstore, {
      name: "Admin",
    })
  )
);

export default UseAdminStore;
