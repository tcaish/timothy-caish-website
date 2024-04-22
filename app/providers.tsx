'use client';

import { isDevelopmentEnv } from '@/constants/device';
import { createSha512Hash, getIpv6Address } from '@/helpers';
import { LocalStorage } from '@/services/local-storage';
import { i18n } from '@/services/localization';
import { Mixpanel } from '@/services/mixpanel';
import { addUniqueVisitor } from '@/services/supabase-database/adders/unique_visitors';
import theme from '@/theme';
import { useStore } from '@/zustand/store';
import { Error } from '@bugsnag/core/types/event';
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
        onError: (event) => {
          const errorsToIgnore = [
            'ResizeObserver loop completed',
            'ResizeObserver loop limit exceeded'
          ];
          const errorFilter = (errorToCheck: Error) =>
            errorsToIgnore.some((errorToIgnore) =>
              errorToCheck.errorMessage.includes(errorToIgnore)
            );

          // If the error is in the ignore list, don't send it to Bugsnag
          if (event.errors.filter(errorFilter).length > 0) {
            return false;
          }

          return true;
        },
        plugins: [new BugsnagPluginReact()]
      });
    }

    // Initialize Mixpanel
    Mixpanel.init();
  }, []);

  // Track unique visitors
  React.useEffect(() => {
    async function trackUniqueVisitor() {
      const ipv6Address = await getIpv6Address();

      // If we couldn't fetch the IPV6 address
      if (!ipv6Address) return;

      const hashedIpv6Address = createSha512Hash(ipv6Address);
      addUniqueVisitor(hashedIpv6Address);
    }

    // Only track unique visitors in production
    if (!isDevelopmentEnv) trackUniqueVisitor();
  }, []);

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
