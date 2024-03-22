import { create } from 'zustand';

interface ZustandStore {
  showLanguagesMenu: boolean;
  setShowLanguagesMenu: (enabled: boolean) => void;

  windowWidth: number;
  setWindowWidth: (width: number) => void;
}

export const useStore = create<ZustandStore>()((set) => ({
  showLanguagesMenu: false,
  setShowLanguagesMenu: (enabled) => set({ showLanguagesMenu: enabled }),

  windowWidth: 0,
  setWindowWidth: (width) => set({ windowWidth: width })
}));
