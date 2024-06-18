import { create } from "zustand";

type ModalData = {
  title: string;
  inputs: { label: string; type: string; placeholder: string }[];
  buttons: { label: string; onClick: () => void }[];
};

type Store = {
  selectedModule: string;
  setSelectedModule: (moduleSelected: string) => void;
  EmailBuilderOpen: boolean;
  setEmailBuilderOpen: (open: boolean) => void;
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  modalData: ModalData | null;
  setModalData: (data: ModalData) => void;
  isSidebarExpanded: boolean;
  setisSidebarExpanded: (open: boolean) => void;
};

const useGlobalStore = create<Store>((set) => ({
  selectedModule: "Dashboard",
  setSelectedModule: (moduleSelected) =>
    set({ selectedModule: moduleSelected }),
  EmailBuilderOpen: false,
  setEmailBuilderOpen: (open: boolean) => set({ EmailBuilderOpen: open }),
  isModalOpen: false,
  setModalOpen: (open: boolean) => set({ isModalOpen: open }),
  modalData: null,
  setModalData: (data: ModalData) => set({ modalData: data }),
  isSidebarExpanded: true,
  setisSidebarExpanded: (open: boolean) => set({ isSidebarExpanded: open }),
}));

export default useGlobalStore;
