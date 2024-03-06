import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const adminstore = (set) => ({
  data: {
    id: "",
    Name: "",
    email: "",
  },
  leave: [],
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
  getleave: (leave_data) =>
    set(() => ({
      leave: leave_data,
    })),
  remove_leave: (leave_id) =>
    set((state) => ({
      leave: state.leave.filter((leave) => leave.id !== leave_id),
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
