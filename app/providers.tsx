'use client';

import theme from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers(props: ProvidersProps) {
  return <ChakraProvider theme={theme}>{props.children}</ChakraProvider>;
}
