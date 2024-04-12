'use client';

import FadeIn from '@/components/FadeIn';
import { SocialUrls } from '@/constants/business';
import { openUrlInNewTab } from '@/helpers';
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
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { BsGithub } from 'react-icons/bs';

export default function Footer() {
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
      <Flex
        alignItems={{ base: 'end', lg: 'center' }}
        direction={{ base: 'column', lg: 'row' }}
      >
        {/* Total unique visitors */}
        <FadeIn>
          <Stat textAlign={{ base: 'end', lg: 'unset' }}>
            <StatNumber
              color={useColorModeValue('gray.700', 'gray.300')}
              fontSize="lg"
            >
              {store.totalUniqueVisitors.toLocaleString(store.locale)}
            </StatNumber>
            <StatHelpText fontSize="sm">
              {i18n.t('total_unique_visitors')}
            </StatHelpText>
          </Stat>
        </FadeIn>

        <Spacer />

        <FadeIn>
          <Flex
            alignItems="end"
            direction="column"
            gap={1}
            mt={{ base: 2, lg: 'unset' }}
          >
            <Flex alignItems="center" gap={2}>
              <motion.div
                onClick={() => openUrlInNewTab(SocialUrls.Github)}
                style={{ maxHeight: '1.25rem' }}
                whileHover={{ scale: 1.2 }}
                whileTap={{
                  scale: 0.8
                }}
              >
                <Icon
                  as={BsGithub}
                  boxSize={5}
                  color={useColorModeValue('gray.700', 'gray.300')}
                  cursor="pointer"
                />
              </motion.div>
            </Flex>

            <Box mb={2}>
              <Text
                color={useColorModeValue('gray.700', 'gray.300')}
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
