'use client';

import FadeIn from '@/components/FadeIn';
import LanguagesMenu from '@/components/LanguagesMenu';
import { Routes } from '@/constants/routes';
import { useColorMode } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import { Box, Container, Divider, Flex, Link, Spacer } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { BsMoonFill } from 'react-icons/bs';
import { FaSun } from 'react-icons/fa';

/**
 * Navigation bar component.
 */
export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <nav>
      <Container maxW="container.xl" paddingY="8px">
        <Flex alignItems="center">
          {/* Logo */}
          <Box>
            <Link href={Routes.Home}>
              <FadeIn>
                <Image
                  alt="Timothy Caish Logo"
                  src={
                    colorMode === 'dark'
                      ? '/assets/logo/logo__dark.png'
                      : '/assets/logo/logo__light.png'
                  }
                  w={{ base: '100px', md: '150px' }}
                />
              </FadeIn>
            </Link>
          </Box>

          <Spacer />

          {/* Languages menu */}
          <Box
            me={4}
            _hover={{
              cursor: 'pointer'
            }}
          >
            <FadeIn>
              <LanguagesMenu />
            </FadeIn>
          </Box>

          {/* Theme toggle */}
          <Box
            _hover={{
              cursor: 'pointer'
            }}
          >
            <motion.div
              onClick={() => toggleColorMode()}
              style={{ maxHeight: '2rem' }}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{
                scale: 0.8,
                rotate: -90
              }}
            >
              <AnimatePresence>
                {colorMode === 'dark' ? (
                  <FadeIn>
                    <Icon as={FaSun} color="#DBC300" boxSize={8} />
                  </FadeIn>
                ) : (
                  <FadeIn>
                    <Icon as={BsMoonFill} color="#2D3748" boxSize={7} />
                  </FadeIn>
                )}
              </AnimatePresence>
            </motion.div>
          </Box>
        </Flex>
      </Container>

      <Divider borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'} />
    </nav>
  );
}
