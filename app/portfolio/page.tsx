'use client';

import PageContainer from '@/components/PageContainer';
import { SimpleGrid } from '@chakra-ui/react';

export default function Contact() {
  return (
    <PageContainer>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}></SimpleGrid>
    </PageContainer>
  );
}
