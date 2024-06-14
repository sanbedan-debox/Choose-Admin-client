// import { create } from "zustand";

// type Store = {
//   selectedModule: string;
//   setSelectedModule: (moduleSelected: string) => void;
//   EmailBuilderOpen: boolean;
//   setEmailBuilderOpen: (open: boolean) => void; // Update to accept a boolean
// };

// const useGlobalStore = create<Store>()((set) => ({
//   selectedModule: "Dashboard",
//   setSelectedModule: (moduleSelected) =>
//     set((state) => ({ selectedModule: moduleSelected })),
//   EmailBuilderOpen: false,
//   setEmailBuilderOpen: (open: boolean) => set(() => ({ EmailBuilderOpen: open })), // Use the parameter to set the state
// }));

// export default useGlobalStore;

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
};

const useGlobalStore = create<Store>((set) => ({
  selectedModule: "Dashboard",
  setSelectedModule: (moduleSelected) => set({ selectedModule: moduleSelected }),
  EmailBuilderOpen: false,
  setEmailBuilderOpen: (open: boolean) => set({ EmailBuilderOpen: open }),
  isModalOpen: false,
  setModalOpen: (open: boolean) => set({ isModalOpen: open }),
  modalData: null,
  setModalData: (data: ModalData) => set({ modalData: data }),
}));

export default useGlobalStore;
