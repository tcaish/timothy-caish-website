'use client';

import DeveloperJson from '@/assets/lottie/developer.json';
import AnimatedBackground from '@/components/AnimatedBackground';
import FadeIn from '@/components/FadeIn';
import FullPageBlur from '@/components/FullPageBlur';
import Navbar from '@/components/Navbar';
import { useStore } from '@/zustand/store';
import { useColorMode } from '@chakra-ui/color-mode';
import { Box, Center, Flex, Heading, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Balancer } from 'react-wrap-balancer';

export default function Home() {
  const { colorMode } = useColorMode();
  const store = useStore();

  const defaultWaitInterval = 3000;

  // Listen for window resize events
  React.useEffect(() => {
    function handleResize() {
      store.setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <FadeIn duration={5}>
        <AnimatedBackground />
      </FadeIn>

      <Flex direction="column" h="100%">
        {/* Navigation bar */}
        <Navbar />

        {/* Full page blur */}
        {store.showLanguagesMenu && <FullPageBlur />}

        {/* Main content */}
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          h="100%"
          justifyContent="space-between"
        >
          {/* Left side */}
          <Center flexBasis={0} flexGrow={1} zIndex={0}>
            <FadeIn>
              <Box textAlign={{ base: 'center', lg: 'end' }}>
                <Avatar
                  name="Timothy Caish"
                  size="2xl"
                  src="/assets/avatar.png"
                />

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

                <Box
                  mx={{ base: 4, sm: 10, lg: 0 }}
                  textAlign={{ base: 'center', lg: 'end' }}
                >
                  <Balancer>
                    <Text
                      color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}
                      fontSize={{ base: 'md', md: 'lg' }}
                      mt={4}
                    >
                      With a blend of creativity and technical expertise, I
                      excel as a full stack developer, transforming ideas into
                      dynamic mobile and web applications that enhance user
                      engagement and propel businesses forward.
                    </Text>
                  </Balancer>
                </Box>
              </Box>
            </FadeIn>
          </Center>

          {/* Right side */}
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
