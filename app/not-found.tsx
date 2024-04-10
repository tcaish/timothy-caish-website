'use client';

import NotFoundJson from '@/assets/lottie/not_found.json';
import AnimatedPressIn from '@/components/AnimatedPressIn';
import PageContainer from '@/components/PageContainer';
import { Routes } from '@/constants/routes';
import { i18n } from '@/services/localization';
import { Box, Button, Center, Icon, Text } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
  const router = useRouter();

  return (
    <PageContainer>
      <Center flexDirection="column" h="100%" textAlign="center">
        <Box h="40%">
          <Lottie
            animationData={NotFoundJson}
            style={styles.not_found_lottie}
          />
        </Box>

        <Box px={{ base: 12, md: 200 }}>
          <Text fontSize="lg">{i18n.t('not_found_desc')}</Text>

          <AnimatedPressIn>
            <Button
              leftIcon={<Icon as={FaArrowLeft} boxSize={5} />}
              mt={4}
              onClick={() => router.push(Routes.Home.path)}
              size="md"
              variant="outline"
            >
              {i18n.t('go_home')}
            </Button>
          </AnimatedPressIn>
        </Box>
      </Center>
    </PageContainer>
  );
}

const styles = {
  not_found_lottie: {
    width: '100%',
    height: '100%'
  }
};
