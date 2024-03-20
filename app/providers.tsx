'use client';

import { ChakraProvider } from '@chakra-ui/react';

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers(props: ProvidersProps) {
  return <ChakraProvider>{props.children}</ChakraProvider>;
}
