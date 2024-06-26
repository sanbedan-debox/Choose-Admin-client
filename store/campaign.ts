import { create } from "zustand";


type Store = {
    isCreateEmailCampaignModalOpen: boolean;
    setCreateEmailCampaignModalOpen: (open: boolean) => void;
    selectedTargetValue: string;
    setselectedTargetValue: (target: string) => void;
};

const useCampaignStore = create<Store>((set) => ({

    isCreateEmailCampaignModalOpen: false,
    setCreateEmailCampaignModalOpen: (open: boolean) => set({ isCreateEmailCampaignModalOpen: open }),
    selectedTargetValue: '',
    setselectedTargetValue: (target: string) => set({ selectedTargetValue: target }),
}));

export default useCampaignStore;
