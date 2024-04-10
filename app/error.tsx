'use client';

import ErrorJson from '@/assets/lottie/error.json';
import AnimatedPressIn from '@/components/AnimatedPressIn';
import PageContainer from '@/components/PageContainer';
import { Routes } from '@/constants/routes';
import { Box, Button, Center, Icon, Text } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function Error() {
  const router = useRouter();

  return (
    <PageContainer>
      <Center flexDirection="column" h="100%" textAlign="center">
        <Box h="40%">
          <Lottie animationData={ErrorJson} style={styles.error_lottie} />
        </Box>

        <Box px={{ base: 12, md: 200 }}>
          <Text fontSize="lg">
            Ah, you've stumbled upon our exclusive 500 Club - a place we didn't
            think you'd find (and frankly, hoped you wouldn't). While our tech
            team works their magic to fix what's amiss, let's get you back to
            safety.
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
  error_lottie: {
    width: '100%',
    height: '100%'
  }
};
