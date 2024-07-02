import { create } from "zustand";

type Tab = {
    title: string;
    value: string;
    content?: string | React.ReactNode | any;
};

type TabStore = {
    active: Tab;
    setActive: (active: Tab) => void;
    tabs: Tab[];
    setTabs: (tabs: Tab[]) => void;
};

const useTabStore = create<TabStore>((set) => ({
    active: {} as Tab,
    setActive: (active: Tab) => set({ active }),
    tabs: [],
    setTabs: (tabs: Tab[]) => set({ tabs }),
}));

export default useTabStore;
