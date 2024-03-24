'use client';

import DeveloperJson from '@/assets/lottie/developer.json';
import AnimatedBackground from '@/components/AnimatedBackground';
import AnimatedPressIn from '@/components/AnimatedPressIn';
import FadeIn from '@/components/FadeIn';
import FullPageBlur from '@/components/FullPageBlur';
import { i18n } from '@/services/localization';
import { getTotalUniqueVisitors } from '@/services/supabase-database/getters/unique_visitors';
import { createUniqueVisitorsListener } from '@/services/supabase-database/realtime-listeners/unique_visitors';
import { useStore } from '@/zustand/store';
import { useColorMode } from '@chakra-ui/color-mode';
import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { Avatar, Button, Icon } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import React from 'react';
import { IoMdContact } from 'react-icons/io';
import { LuPocketKnife } from 'react-icons/lu';
import { TypeAnimation } from 'react-type-animation';
import { Balancer } from 'react-wrap-balancer';

const defaultWaitInterval = 3000;

export default function Home() {
  const { colorMode } = useColorMode();
  const store = useStore();

  // Set the total unique visitors on page load
  React.useEffect(() => {
    getTotalUniqueVisitors().then((totalUniqueVisitors) => {
      store.setTotalUniqueVisitors(totalUniqueVisitors);
    });
  }, []);

  // Listen to realtime changes in the unique visitors table
  React.useEffect(() => {
    const listener = createUniqueVisitorsListener(store).subscribe();

    return () => {
      listener.unsubscribe();
    };
  }, []);

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
      <AnimatedBackground shouldFadeIn={true} />

      <Flex direction="column" h="100%">
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
                    size="2xl"
                  >
                    {i18n.t('hello_world')}
                  </Heading>
                </Balancer>

                {/* Type animation */}
                <Balancer>
                  <Heading color={colorMode === 'dark' ? 'white' : 'gray.700'}>
                    <CustomTypeAnimation />
                  </Heading>
                </Balancer>

                {/* Description and CTA */}
                <Box mt={4} textAlign={{ base: 'center', lg: 'end' }}>
                  <Balancer>
                    <Text
                      color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}
                      fontSize={{ base: 'md', md: 'lg' }}
                    >
                      {i18n.t('with_blend_of_creativity')}
                    </Text>
                  </Balancer>

                  <Stack
                    direction="row"
                    justifyContent={{ base: 'center', lg: 'end' }}
                    mt={4}
                    spacing={4}
                  >
                    <AnimatedPressIn>
                      <Button
                        leftIcon={<Icon as={LuPocketKnife} boxSize={5} />}
                        size={{ base: 'md', lg: 'lg' }}
                        variant="solid"
                      >
                        {i18n.t('my_skillset')}
                      </Button>
                    </AnimatedPressIn>

                    <AnimatedPressIn>
                      <Button
                        rightIcon={<Icon as={IoMdContact} boxSize={6} />}
                        size={{ base: 'md', lg: 'lg' }}
                        variant="outline"
                      >
                        {i18n.t('contact_me')}
                      </Button>
                    </AnimatedPressIn>
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
