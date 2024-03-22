'use client';

import FadeIn from '@/components/FadeIn';
import LanguagesMenu from '@/components/LanguagesMenu';
import { Routes } from '@/constants/routes';
import { useColorMode } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import { Box, Container, Divider, Flex, Link, Spacer } from '@chakra-ui/layout';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

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
                  w={{ base: '50px', md: '65px' }}
                />
              </FadeIn>
            </Link>
          </Box>

          <Spacer />

          {/* Languages menu */}
          <Box
            me={2}
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
            borderRadius={6}
            padding={1}
            _hover={{
              cursor: 'pointer'
            }}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{
                scale: 0.8,
                rotate: -90
              }}
              onClick={() => toggleColorMode()}
            >
              <AnimatePresence>
                {colorMode === 'dark' ? (
                  <FadeIn>
                    <Sun color="#DBC300" fill="#DBC300" />
                  </FadeIn>
                ) : (
                  <FadeIn>
                    <Moon fill="#2D3748" />
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
