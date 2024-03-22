import { create } from 'zustand';

interface ZustandStore {
  showLanguagesMenu: boolean;
  setShowLanguagesMenu: (enabled: boolean) => void;
}

export const useStore = create<ZustandStore>()((set) => ({
  showLanguagesMenu: false,
  setShowLanguagesMenu: (enabled) => set({ showLanguagesMenu: enabled })
}));
