'use client';

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
import { motion } from 'framer-motion';
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
            <motion.div
              onClick={() => openUrlInNewTab(SocialUrls.facebook)}
              style={{ maxHeight: '1.25rem' }}
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 0.8
              }}
            >
              <Icon
                as={BsFacebook}
                boxSize={5}
                color={colorMode === 'dark' ? 'white' : 'gray.700'}
                cursor="pointer"
              />
            </motion.div>

            <motion.div
              onClick={() => openUrlInNewTab(SocialUrls.twitter)}
              style={{ maxHeight: '1.25rem' }}
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 0.8
              }}
            >
              <Icon
                as={BsTwitterX}
                boxSize={5}
                color={colorMode === 'dark' ? 'white' : 'gray.700'}
                cursor="pointer"
              />
            </motion.div>
          </Flex>
        </FadeIn>
      </Flex>
    </Container>
  );
}
