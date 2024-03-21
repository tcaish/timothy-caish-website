'use client';

import DeveloperJson from '@/assets/lottie/developer.json';
import AnimatedBackground from '@/components/AnimatedBackground';
import FadeIn from '@/components/FadeIn';
import Navbar from '@/components/Navbar';
import { useColorMode } from '@chakra-ui/color-mode';
import { Box, Center, Flex, Heading } from '@chakra-ui/layout';
import Lottie from 'lottie-react';
import { TypeAnimation } from 'react-type-animation';
import { Balancer } from 'react-wrap-balancer';

export default function Home() {
  const { colorMode } = useColorMode();

  const defaultWaitInterval = 3000;

  return (
    <>
      <FadeIn duration={5}>
        <AnimatedBackground />
      </FadeIn>

      <Flex direction="column" h="100%">
        <Navbar />

        <Flex
          direction={{ base: 'column', lg: 'row' }}
          h="100%"
          justifyContent="space-between"
        >
          <Center flexBasis={0} flexGrow={1}>
            <FadeIn>
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
                      deletionSpeed={80}
                      preRenderFirstString={true}
                      sequence={[
                        'create websites',
                        2000,
                        'create websites with React',
                        defaultWaitInterval,
                        'create websites with Next.js',
                        defaultWaitInterval,
                        'create websites with Chakra UI',
                        defaultWaitInterval,
                        'create mobile apps',
                        defaultWaitInterval,
                        'create mobile apps with React Native',
                        defaultWaitInterval,
                        'create mobile apps with Expo',
                        defaultWaitInterval,
                        'can integrate with Supabase',
                        defaultWaitInterval,
                        'can integrate with Firebase',
                        defaultWaitInterval,
                        'can integrate with AWS',
                        defaultWaitInterval,
                        'love what I do! 🚀🌈'
                      ]}
                      speed={60}
                    />
                  </Heading>
                </Balancer>
              </Box>
            </FadeIn>
          </Center>

          <Center flexBasis={0} flexGrow={1}>
            <FadeIn>
              <Box>
                <Lottie
                  animationData={DeveloperJson}
                  style={styles.developer_lottie}
                />
              </Box>
            </FadeIn>
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
