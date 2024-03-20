'use client';

import { Routes } from '@/constants/routes';
import { useColorMode } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import { Box, Container, Divider, Flex, Link, Spacer } from '@chakra-ui/layout';

export default function Navbar() {
  const { colorMode } = useColorMode();

  return (
    <nav>
      <Container maxW="container.xl" paddingY="8px">
        <Flex>
          <Box>
            <Link href={Routes.Home}>
              <Image
                alt="Timothy Caish Logo"
                src={
                  colorMode === 'dark'
                    ? '/assets/logo/logo__dark.png'
                    : '/assets/logo/logo__light.png'
                }
                w={{ base: '65px', md: '80px' }}
              />
            </Link>
          </Box>

          <Spacer />

          <Box></Box>
        </Flex>
      </Container>

      <Divider
        borderBottomWidth="3px"
        borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
      />
    </nav>
  );
}
