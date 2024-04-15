'use client';

import { LocalStorage } from '@/services/local-storage';
import { i18n } from '@/services/localization';
import { Mixpanel } from '@/services/mixpanel';
import { addUniqueVisitor } from '@/services/supabase-database/adders/unique_visitors';
import theme from '@/theme';
import { useStore } from '@/zustand/store';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import React from 'react';

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers(props: ProvidersProps) {
  const store = useStore();

  // Initialize any services
  React.useEffect(() => {
    // Initialize Bugsnag
    if (!Bugsnag.isStarted() && process.env.NEXT_PUBLIC_BUGSNAG_API_KEY) {
      Bugsnag.start({
        apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
        enabledReleaseStages: ['production'],
        plugins: [new BugsnagPluginReact()],
        onError: (event) => {
          // Ignore the errors below
          if (
            event.errors[0].errorMessage.includes(
              'ResizeObserver loop completed with undelivered notifications'
            ) ||
            event.errors[0].errorMessage.includes('while hydrating')
          ) {
            return false;
          }

          return true;
        }
      });
    }

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
      store.setLocale(storedLanguage);
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

  return (
    <ThemeProvider defaultTheme="light" enableSystem={true}>
      <ChakraProvider theme={theme}>{props.children}</ChakraProvider>
    </ThemeProvider>
  );
}
