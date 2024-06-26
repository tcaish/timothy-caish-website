'use client';

import PageContainer from '@/components/PageContainer';
import { i18n } from '@/services/localization';
import { Center, Spinner, Text } from '@chakra-ui/react';

export default function Loading() {
  return (
    <PageContainer>
      <Center flexDirection="column" h="100%" textAlign="center">
        <Spinner color="primary.400" size="xl" />

        <Text color="gray.400" fontSize="3xl" mt={2}>
          {i18n.t('loading')}
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
