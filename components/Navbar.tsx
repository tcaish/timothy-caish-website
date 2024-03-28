'use client';

import LanguagesMenu from '@/components/LanguagesMenu';
import { Routes } from '@/constants/routes';
import { useColorMode } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import { Box, Container, Divider, Flex, Link, Spacer } from '@chakra-ui/layout';
import { Icon, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BsMoonFill } from 'react-icons/bs';
import { FaSun } from 'react-icons/fa';

/**
 * Navigation bar component.
 */
export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <nav>
      <Container maxW="container.xl" paddingY={2}>
        <Flex alignItems="center">
          {/* Left side - logo */}
          <Box>
            <Link href={Routes.Home.path}>
              <Image
                alt="Timothy Caish Logo"
                src={useColorModeValue(
                  '/assets/logo/logo__light.png',
                  '/assets/logo/logo__dark.png'
                )}
                w={{ base: '100px', md: '150px' }}
              />
            </Link>
          </Box>

          <Spacer />

          {/* Right side */}
          <Flex>
            {/* Languages menu */}
            <Box
              me={4}
              _hover={{
                cursor: 'pointer'
              }}
            >
              <LanguagesMenu />
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
                {colorMode === 'dark' ? (
                  <Icon as={FaSun} color="#DBC300" boxSize={8} />
                ) : (
                  <Icon as={BsMoonFill} color="#2D3748" boxSize={7} />
                )}
              </motion.div>
            </Box>
          </Flex>
        </Flex>
      </Container>

      <Divider borderColor={useColorModeValue('gray.200', 'gray.600')} />
    </nav>
  );
}
