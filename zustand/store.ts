import { create } from 'zustand';

interface ZustandStore {
  isFullPageBlurEnabled: boolean;
  setFullPageBlurEnabled: (enabled: boolean) => void;
}

export const useStore = create<ZustandStore>()((set) => ({
  isFullPageBlurEnabled: false,
  setFullPageBlurEnabled: (enabled) => set({ isFullPageBlurEnabled: enabled })
}));
