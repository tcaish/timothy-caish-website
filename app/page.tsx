'use client';

import DeveloperJson from '@/assets/lottie/developer.json';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { useColorMode } from '@chakra-ui/color-mode';
import { Box, Center, Flex, Heading } from '@chakra-ui/layout';
import Lottie from 'lottie-react';
import { TypeAnimation } from 'react-type-animation';
import { Balancer } from 'react-wrap-balancer';

export default function Home() {
  const { colorMode } = useColorMode();

  return (
    <>
      <AnimatedBackground />

      <Flex direction="column" h="100%">
        <Navbar />

        <Flex
          direction={{ base: 'column', lg: 'row' }}
          h="100%"
          justifyContent="space-between"
        >
          <Center flexBasis={0} flexGrow={1}>
            <Box textAlign={{ base: 'center', lg: 'end' }}>
              <Balancer>
                <Heading
                  color={colorMode === 'dark' ? 'white' : 'gray.700'}
                  size="2xl"
                >
                  Hello, world 👋🏼 My name is Timothy Caish, and I
                </Heading>
              </Balancer>

              <Balancer>
                <Heading color={colorMode === 'dark' ? 'white' : 'gray.700'}>
                  <TypeAnimation
                    deletionSpeed={60}
                    preRenderFirstString={true}
                    sequence={[
                      'create websites',
                      2000,
                      'create websites with React',
                      3000,
                      'create websites with Next.js',
                      3000,
                      'create websites with Chakra UI',
                      3000,
                      'create mobile apps',
                      3000,
                      'create mobile apps with React Native',
                      3000,
                      'create mobile apps with Expo',
                      3000
                    ]}
                    speed={60}
                  />
                </Heading>
              </Balancer>
            </Box>
          </Center>

          <Center flexBasis={0} flexGrow={1}>
            <Box>
              <Lottie
                animationData={DeveloperJson}
                style={styles.developer_lottie}
              />
            </Box>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}

const styles = {
  developer_lottie: {
    width: '100%',
    height: '450px'
  }
};
