'use client';

import { LocalStorage } from '@/services/local-storage';
import { i18n } from '@/services/localization';
import { Mixpanel } from '@/services/mixpanel';
import { addUniqueVisitor } from '@/services/supabase-database/adders/unique_visitors';
import theme from '@/theme';
import { useStore } from '@/zustand/store';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers(props: ProvidersProps) {
  const store = useStore();

  // Initialize any services
  React.useEffect(() => {
    // Initialize Mixpanel
    Mixpanel.init();
  }, []);

  // Track unique visitors
  React.useEffect(() => {
    const mixpanelDeviceId = Mixpanel.getDeviceId();
    mixpanelDeviceId && addUniqueVisitor(mixpanelDeviceId);
  }, [Mixpanel.mixpanelClient]);

  // Set the language from local storage on load if it exists
  React.useEffect(() => {
    const storedLanguage = LocalStorage.get(LocalStorage.Keys.Language);

    if (storedLanguage) {
      i18n.locale = storedLanguage;

      /**
       * In dark mode, it does an extra rerender, so the page rerenders and
       * shows the correct language, but on light mode, it does not do this
       * extra rerender, so the language does not change on initial load of
       * page. This line is needed to trigger a rerender.
       * (It's stupid, I know. I'm not knowledgable enough on this specific
       * issue to fix it properly.)
       */
      store.setShowLanguagesMenu(false);
    }
  }, []);

  // Listen for window resize events
  React.useEffect(() => {
    function handleResize() {
      store.setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <ChakraProvider theme={theme}>{props.children}</ChakraProvider>;
}
