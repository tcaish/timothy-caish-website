'use client';

import DeveloperJson from '@/assets/lottie/developer.json';
import AnimatedBackground from '@/components/AnimatedBackground';
import FadeIn from '@/components/FadeIn';
import FullPageBlur from '@/components/FullPageBlur';
import Navbar from '@/components/Navbar';
import { i18n } from '@/services/localization';
import { useStore } from '@/zustand/store';
import { useColorMode } from '@chakra-ui/color-mode';
import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { Avatar, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { CircleUserRound, GalleryVerticalEnd } from 'lucide-react';
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Balancer } from 'react-wrap-balancer';
import { useScramble } from 'use-scramble';

const defaultWaitInterval = 3000;

export default function Home() {
  const { colorMode } = useColorMode();
  const store = useStore();

  const helloWorldTextScramble = useScramble({
    chance: 1,
    ignore: [' ', '!', '?', '👋🏼', '🚀', '🌈'],
    onAnimationEnd: () => console.log('animation ended'),
    onAnimationStart: () => console.log('animation started'),
    overdrive: false,
    overflow: true,
    playOnMount: false,
    range: [97, 122],
    scramble: 10,
    seed: 5,
    speed: 0.5,
    step: 10,
    text: i18n.t('hello_world'),
    tick: 1
  });

  // Listen for when the language was changed
  React.useEffect(() => {
    // If the language was not selected
    if (!store.languageWasSelected) return;

    // Reset the language selected flag
    store.setLanguageWasSelected(false);
  }, [store.languageWasSelected]);

  const CustomTypeAnimation = React.useCallback(
    () => (
      <TypeAnimation
        deletionSpeed={80}
        preRenderFirstString={true}
        sequence={[
          i18n.t('create_websites'),
          2000,
          i18n.t('create_websites_with_react'),
          defaultWaitInterval,
          i18n.t('create_websites_with_nextjs'),
          defaultWaitInterval,
          i18n.t('create_websites_with_chakra'),
          defaultWaitInterval,
          i18n.t('create_mobile_apps'),
          defaultWaitInterval,
          i18n.t('create_mobile_apps_with_react_native'),
          defaultWaitInterval,
          i18n.t('create_mobile_apps_with_expo'),
          defaultWaitInterval,
          i18n.t('can_integrate_with_supabase'),
          defaultWaitInterval,
          i18n.t('can_integrate_with_firebase'),
          defaultWaitInterval,
          i18n.t('can_integrate_with_aws'),
          defaultWaitInterval,
          `${i18n.t('love_what_i_do')} 🚀🌈`
        ]}
        speed={60}
      />
    ),
    [i18n.locale]
  );

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
                {/* Avatar image */}
                <Avatar
                  name="Timothy Caish"
                  size="2xl"
                  src="/assets/avatar.png"
                />

                {/* Greeting */}
                <Balancer>
                  <Heading
                    color={colorMode === 'dark' ? 'white' : 'gray.700'}
                    ref={helloWorldTextScramble.ref}
                    size="2xl"
                  >
                    {/* {i18n.t('hello_world')} */}
                  </Heading>
                </Balancer>

                {/* Type animation */}
                <Balancer>
                  <Heading color={colorMode === 'dark' ? 'white' : 'gray.700'}>
                    <CustomTypeAnimation />
                  </Heading>
                </Balancer>

                {/* Description and CTA */}
                <Box
                  mt={4}
                  mx={{ base: 4, sm: 10, lg: 0 }}
                  textAlign={{ base: 'center', lg: 'end' }}
                >
                  <Balancer>
                    <Text
                      color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}
                      fontSize={{ base: 'md', md: 'lg' }}
                    >
                      With a blend of creativity and technical expertise, I
                      excel as a full stack developer, transforming ideas into
                      dynamic mobile and web applications that enhance user
                      engagement and propel businesses forward.
                    </Text>
                  </Balancer>

                  <Stack
                    direction="row"
                    justifyContent={{ base: 'center', lg: 'end' }}
                    mt={4}
                    spacing={4}
                  >
                    <motion.div whileTap={{ scale: 0.8 }}>
                      <Button
                        leftIcon={<GalleryVerticalEnd />}
                        size={{ base: 'md', lg: 'lg' }}
                        variant="solid"
                      >
                        Portfolio
                      </Button>
                    </motion.div>

                    <motion.div whileTap={{ scale: 0.8 }}>
                      <Button
                        rightIcon={<CircleUserRound />}
                        size={{ base: 'md', lg: 'lg' }}
                        variant="outline"
                      >
                        Contact Me
                      </Button>
                    </motion.div>
                  </Stack>
                </Box>
              </Box>
            </FadeIn>
          </Center>

          {/* Right side */}
          <Center flexBasis={0} flexGrow={1}>
            <FadeIn>
              <Box px={{ base: 12, md: 32, lg: 12 }}>
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
    height: '100%',
    width: '100%'
  }
};
