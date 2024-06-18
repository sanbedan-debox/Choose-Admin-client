import { create } from "zustand";

type ModalData = {
  title: string;
  inputs: { label: string; type: string; placeholder: string }[];
  buttons: { label: string; onClick: () => void }[];
};

type ToastData = {
  message: string;
  type: "success" | "error" | "warning";
  title?: string; // Make title property optional
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
  toastData: ToastData | null;
  setToastData: (data: ToastData | null) => void;
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
  toastData: null,
  setToastData: (data: ToastData | null) => set({ toastData: data }),
}));

export default useGlobalStore;
