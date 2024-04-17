'use client';

import BusinessCard from '@/components/BusinessCard';
import PageContainer from '@/components/PageContainer';
import { Center, Stack } from '@chakra-ui/react';

export default function Contact() {
  return (
    <PageContainer>
      <Stack
        gap={6}
        justifyContent={{ base: 'start', md: 'center' }}
        mt={{ base: 4, md: 0 }}
        w="100%"
      >
        <Center>
          <BusinessCard side="front" />
        </Center>

        <Center>
          <BusinessCard side="back" />
        </Center>
      </Stack>
    </PageContainer>
  );
}
