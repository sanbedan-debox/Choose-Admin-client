import { create } from "zustand";

type Store = {
  selectedModule: string;
  setSelectedModule: (moduleSelected: string) => void;
};

const useGlobalStore = create<Store>()((set) => ({
  selectedModule: "Dashboard",
  setSelectedModule: (moduleSelected) =>
    set((state) => ({ selectedModule: moduleSelected })),
}));

export default useGlobalStore;
