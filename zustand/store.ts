import { create } from 'zustand';

interface ZustandStore {
  languageWasSelected: boolean;
  setLanguageWasSelected: (enabled: boolean) => void;

  showLanguagesMenu: boolean;
  setShowLanguagesMenu: (enabled: boolean) => void;

  windowWidth: number;
  setWindowWidth: (width: number) => void;
}

export const useStore = create<ZustandStore>()((set) => ({
  languageWasSelected: false,
  setLanguageWasSelected: (enabled) => set({ languageWasSelected: enabled }),

  showLanguagesMenu: false,
  setShowLanguagesMenu: (enabled) => set({ showLanguagesMenu: enabled }),

  windowWidth: 0,
  setWindowWidth: (width) => set({ windowWidth: width })
}));
