import { WakaTimeAllTimeStats } from "@/constants/types";
import { languageCodes } from "@/services/localization";
import { create } from "zustand";

export type ZustandStore = {
  languageWasSelected: boolean;
  setLanguageWasSelected: (enabled: boolean) => void;

  locale: string;
  setLocale: (locale: string) => void;

  portfolioCardCommentsModalIsOpen: boolean;
  setPortfolioCardCommentsModalIsOpen: (enabled: boolean) => void;

  portfolioItemIdSelected: number | null;
  setPortfolioItemIdSelected: (id: number | null) => void;

  showLanguagesMenu: boolean;
  setShowLanguagesMenu: (enabled: boolean) => void;

  skillCardIndexHovered: number | null;
  setSkillCardIndexHovered: (index: number | null) => void;

  skillCardIndexSelected: number | null;
  setSkillCardIndexSelected: (index: number | null) => void;

  totalUniqueVisitors: number;
  setTotalUniqueVisitors: (total: number) => void;
  addUniqueVisitor: () => void;

  wakatimeStats: WakaTimeAllTimeStats | null;
  setWakatimeStats: (stats: WakaTimeAllTimeStats | null) => void;

  windowWidth: number;
  setWindowWidth: (width: number) => void;
};

export const useStore = create<ZustandStore>()((set) => ({
  languageWasSelected: false,
  setLanguageWasSelected: (enabled) => set({ languageWasSelected: enabled }),

  locale: languageCodes.en,
  setLocale: (locale) => set({ locale }),

  portfolioCardCommentsModalIsOpen: false,
  setPortfolioCardCommentsModalIsOpen: (enabled) =>
    set({ portfolioCardCommentsModalIsOpen: enabled }),

  portfolioItemIdSelected: null,
  setPortfolioItemIdSelected: (id) => set({ portfolioItemIdSelected: id }),

  showLanguagesMenu: false,
  setShowLanguagesMenu: (enabled) => set({ showLanguagesMenu: enabled }),

  skillCardIndexHovered: null,
  setSkillCardIndexHovered: (index) => set({ skillCardIndexHovered: index }),

  skillCardIndexSelected: null,
  setSkillCardIndexSelected: (index) => set({ skillCardIndexSelected: index }),

  totalUniqueVisitors: 0,
  setTotalUniqueVisitors: (total) => set({ totalUniqueVisitors: total }),
  addUniqueVisitor: () =>
    set((state) => ({ totalUniqueVisitors: state.totalUniqueVisitors + 1 })),

  wakatimeStats: null,
  setWakatimeStats: (stats) => set({ wakatimeStats: stats }),

  windowWidth: 0,
  setWindowWidth: (width) => set({ windowWidth: width }),
}));
