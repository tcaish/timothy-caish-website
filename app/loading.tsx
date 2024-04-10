'use client';

import PageContainer from '@/components/PageContainer';
import { Center, CircularProgress, Text } from '@chakra-ui/react';

export default function Loading() {
  return (
    <PageContainer>
      <Center flexDirection="column" h="100%" textAlign="center">
        <CircularProgress color="primary.400" isIndeterminate size={20} />

        <Text color="gray.400" fontSize="3xl" mt={2}>
          Loading...
        </Text>
      </Center>
    </PageContainer>
  );
}

const styles = {
  loading_lottie: {
    width: '100%',
    height: '100%'
  }
};
