import { i18n } from "@/services/localization";

// This needs to be a function so the translations are updated when the language
// is changed
export const Routes = () => {
  return {
    Home: {
      name: i18n.t("routes.home"),
      path: "/",
    },

    Expertise: {
      name: i18n.t("routes.expertise"),
      path: "/expertise",
    },
    Portfolio: {
      name: i18n.t("routes.portfolio"),
      path: "/portfolio",
    },
    Contact: {
      name: i18n.t("routes.contact"),
      path: "/contact",
    },
  };
};
