import { create } from "zustand";

type Store = {
  userRole: string;
  setUserRole: (role: string) => void;
  userName: string;
  setUserName: (name: string) => void;
  userId: string;
  setUserId: (id: string) => void;
};

const useAuthStore = create<Store>((set) => ({
  userRole: "",
  setUserRole: (role) => set({ userRole: role }),
  userName: "",
  setUserName: (name) => set({ userName: name }),
  userId: "",
  setUserId: (id) => set({ userId: id }),
}));

export default useAuthStore;
