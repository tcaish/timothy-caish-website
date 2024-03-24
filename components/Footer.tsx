'use client';

import FadeIn from '@/components/FadeIn';
import { SocialUrls } from '@/constants/business';
import { openUrlInNewTab, shortenNumber } from '@/helpers';
import { i18n } from '@/services/localization';
import { getTotalUniqueVisitors } from '@/services/supabase-database/getters/unique_visitors';
import { createUniqueVisitorsListener } from '@/services/supabase-database/realtime-listeners/unique_visitors';
import { useStore } from '@/zustand/store';
import {
  Box,
  Container,
  Flex,
  Icon,
  Spacer,
  Stat,
  StatHelpText,
  StatNumber,
  Text,
  useColorMode
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { BsFacebook, BsTwitterX } from 'react-icons/bs';

export default function Footer() {
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
          <Flex alignItems="end" direction="column" gap={1}>
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
                  color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}
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
                  color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}
                  cursor="pointer"
                />
              </motion.div>
            </Flex>

            <Box mb={2}>
              <Text
                color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}
                fontSize="sm"
              >
                © {new Date().getFullYear()} Timothy Caish
              </Text>
            </Box>
          </Flex>
        </FadeIn>
      </Flex>
    </Container>
  );
}
