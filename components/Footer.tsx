'use client';

import AnimatedPressIn from '@/components/AnimatedPressIn';
import FadeIn from '@/components/FadeIn';
import { SocialUrls } from '@/constants/business';
import { openUrlInNewTab, shortenNumber } from '@/helpers';
import { i18n } from '@/services/localization';
import { useStore } from '@/zustand/store';
import {
  Container,
  Flex,
  Icon,
  Spacer,
  Stat,
  StatHelpText,
  StatNumber,
  useColorMode
} from '@chakra-ui/react';
import { BsFacebook, BsTwitterX } from 'react-icons/bs';

export default function Footer() {
  const { colorMode } = useColorMode();
  const store = useStore();

  return (
    <Container maxW="container.xl">
      <Flex alignItems="center">
        {/* Total unique visitors */}
        <FadeIn>
          <Stat>
            <StatNumber
              color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}
              fontSize="lg"
            >
              {shortenNumber(store.totalUniqueVisitors)}
            </StatNumber>
            <StatHelpText fontSize="xs">
              {i18n.t('total_unique_visitors')}
            </StatHelpText>
          </Stat>
        </FadeIn>

        <Spacer />

        <FadeIn>
          <Flex alignItems="center" gap={2}>
            <AnimatedPressIn>
              <Icon
                as={BsFacebook}
                boxSize={5}
                color={colorMode === 'dark' ? 'white' : 'gray.700'}
                cursor="pointer"
                onClick={() => openUrlInNewTab(SocialUrls.facebook)}
                _hover={{
                  color: colorMode === 'dark' ? 'gray.300' : 'gray.500'
                }}
              />
            </AnimatedPressIn>

            <AnimatedPressIn>
              <Icon
                as={BsTwitterX}
                boxSize={5}
                color={colorMode === 'dark' ? 'white' : 'gray.700'}
                cursor="pointer"
                onClick={() => openUrlInNewTab(SocialUrls.twitter)}
                _hover={{
                  color: colorMode === 'dark' ? 'gray.300' : 'gray.500'
                }}
              />
            </AnimatedPressIn>
          </Flex>
        </FadeIn>
      </Flex>
    </Container>
  );
}
