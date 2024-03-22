'use client';

import { LocalStorage } from '@/services/local-storage';
import { i18n } from '@/services/localization';
import theme from '@/theme';
import { useStore } from '@/zustand/store';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers(props: ProvidersProps) {
  const store = useStore();

  // Set the language from local storage on load if it exists
  React.useEffect(() => {
    const storedLanguage = LocalStorage.get(LocalStorage.Keys.Language);
    storedLanguage && (i18n.locale = storedLanguage);
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
