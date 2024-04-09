'use client';

import NotFoundJson from '@/assets/lottie/404.json';
import AnimatedPressIn from '@/components/AnimatedPressIn';
import PageContainer from '@/components/PageContainer';
import { Routes } from '@/constants/routes';
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
          <Text fontSize="lg">
            Oops! Looks like you've discovered the great digital void.
            Unfortunately, the page you're looking for has vanished into
            cyberspace. But don't worry! Our best digital detectives are on the
            case. In the meantime, let's get you home.
          </Text>

          <AnimatedPressIn>
            <Button
              leftIcon={<Icon as={FaArrowLeft} boxSize={5} />}
              mt={4}
              onClick={() => router.push(Routes.Home.path)}
              size="md"
              variant="outline"
            >
              Go Home
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
