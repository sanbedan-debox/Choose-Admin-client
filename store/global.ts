import { create } from "zustand";

type Store = {
  selectedModule: string;
  setSelectedModule: (moduleSelected: string) => void;
  EmailBuilderOpen: boolean;
  setEmailBuilderOpen: (open: boolean) => void; // Update to accept a boolean
};

const useGlobalStore = create<Store>()((set) => ({
  selectedModule: "Dashboard",
  setSelectedModule: (moduleSelected) =>
    set((state) => ({ selectedModule: moduleSelected })),
  EmailBuilderOpen: false,
  setEmailBuilderOpen: (open: boolean) => set(() => ({ EmailBuilderOpen: open })), // Use the parameter to set the state
}));

export default useGlobalStore;
