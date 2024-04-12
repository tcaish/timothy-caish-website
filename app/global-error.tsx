'use client';

import ErrorJson from '@/assets/lottie/error.json';
import AnimatedPressIn from '@/components/AnimatedPressIn';
import PageContainer from '@/components/PageContainer';
import { Routes } from '@/constants/routes';
import { i18n } from '@/services/localization';
import { Box, Button, Center, Flex, Icon, Text } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function GlobalError() {
  const router = useRouter();
  const routes = Routes();

  return (
    <html lang={i18n.locale}>
      <body className={inter.className}>
        <Flex direction="column" h="100%">
          <PageContainer>
            <Center flexDirection="column" h="100%" textAlign="center">
              <Box h="40%">
                <Lottie animationData={ErrorJson} style={styles.error_lottie} />
              </Box>

              <Box px={{ base: 12, md: 200 }}>
                <Text fontSize="lg">{i18n.t('error_desc')}</Text>

                <AnimatedPressIn>
                  <Button
                    leftIcon={<Icon as={FaArrowLeft} boxSize={5} />}
                    mt={4}
                    onClick={() => router.push(routes.Home.path)}
                    size="md"
                    variant="outline"
                  >
                    {i18n.t('go_home')}
                  </Button>
                </AnimatedPressIn>
              </Box>
            </Center>
          </PageContainer>
        </Flex>
      </body>
    </html>
  );
}

const styles = {
  error_lottie: {
    width: '100%',
    height: '100%'
  }
};
