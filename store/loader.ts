// store/globalLoaderStore.ts
import { create } from 'zustand';

type GlobalLoaderStore = {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
};

const useGlobalLoaderStore = create<GlobalLoaderStore>((set) => ({
    isLoading: false,
    setLoading: (loading: boolean) => set({ isLoading: loading }),
}));

export default useGlobalLoaderStore;
