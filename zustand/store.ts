import { create } from 'zustand';

export type ZustandStore = {
  languageWasSelected: boolean;
  setLanguageWasSelected: (enabled: boolean) => void;

  showLanguagesMenu: boolean;
  setShowLanguagesMenu: (enabled: boolean) => void;

  totalUniqueVisitors: number;
  setTotalUniqueVisitors: (total: number) => void;

  windowWidth: number;
  setWindowWidth: (width: number) => void;
};

export const useStore = create<ZustandStore>()((set) => ({
  languageWasSelected: false,
  setLanguageWasSelected: (enabled) => set({ languageWasSelected: enabled }),

  showLanguagesMenu: false,
  setShowLanguagesMenu: (enabled) => set({ showLanguagesMenu: enabled }),

  totalUniqueVisitors: 0,
  setTotalUniqueVisitors: (total) => set({ totalUniqueVisitors: total }),

  windowWidth: 0,
  setWindowWidth: (width) => set({ windowWidth: width })
}));
