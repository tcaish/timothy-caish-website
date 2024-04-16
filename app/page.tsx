'use client';

import DeveloperJson from '@/assets/lottie/developer.json';
import AnimatedPressIn from '@/components/Animation/AnimatedPressIn';
import FadeIn from '@/components/Animation/FadeIn';
import PageContainer from '@/components/PageContainer';
import { Routes } from '@/constants/routes';
import { i18n } from '@/services/localization';
import { useStore } from '@/zustand/store';
import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { Avatar, Button, Icon, useColorModeValue } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoMdContact } from 'react-icons/io';
import { LuPocketKnife } from 'react-icons/lu';
import { Balancer } from 'react-wrap-balancer';

// We have to dynamically import the custo type animation component, which is
// not supported in server-side rendering.
const CustomTypeAnimation = dynamic(
  () => import('@/components/Animation/CustomTypeAnimation'),
  {
    ssr: false
  }
);

export default function Home() {
  const router = useRouter();
  const routes = Routes();
  const store = useStore();

  const [contactButtonText, setContactButtonText] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [expertiseButtonText, setExpertiseButtonText] = React.useState('');
  const [heading, setHeading] = React.useState('');

  // Update the text content when the language changes
  React.useEffect(() => {
    setContactButtonText(i18n.t('contact_me'));
    setDescription(i18n.t('with_blend_of_creativity'));
    setExpertiseButtonText(i18n.t('areas_of_expertise'));
    setHeading(i18n.t('hello_world'));
  }, [store.locale]);

  return (
    <PageContainer>
      <Flex direction="column" h="100%">
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
                  <Heading size="2xl">{heading}</Heading>
                </Balancer>

                {/* Type animation */}
                <Balancer>
                  <Heading>
                    <CustomTypeAnimation />
                  </Heading>
                </Balancer>

                {/* Description and CTA */}
                <Box mt={4} textAlign={{ base: 'center', lg: 'end' }}>
                  <Balancer>
                    <Text
                      color={useColorModeValue('gray.700', 'gray.300')}
                      fontSize={{ base: 'md', md: 'lg' }}
                    >
                      {description}
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
                        onClick={() => router.push(routes.Expertise.path)}
                        size={{ base: 'md', lg: 'lg' }}
                        variant="solid"
                      >
                        {expertiseButtonText}
                      </Button>
                    </AnimatedPressIn>

                    <AnimatedPressIn>
                      <Button
                        rightIcon={<Icon as={IoMdContact} boxSize={6} />}
                        size={{ base: 'md', lg: 'lg' }}
                        variant="outline"
                      >
                        {contactButtonText}
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
    </PageContainer>
  );
}

const styles = {
  developer_lottie: {
    height: '100%',
    width: '100%'
  }
};
