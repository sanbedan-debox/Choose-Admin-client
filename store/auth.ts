import { create } from "zustand";

type Store = {
  userRole: string;
  setUserRole: (role: string) => void;
  userName: string;
  setUserName: (name: string) => void;
};

const useAuthStore = create<Store>((set) => ({
  userRole: "",
  setUserRole: (role) => set({ userRole: role }),
  userName: "",
  setUserName: (name) => set({ userName: name }),
}));

export default useAuthStore;
