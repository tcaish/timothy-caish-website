'use client';

import { Routes } from '@/constants/routes';
import { useColorMode } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import { Box, Container, Divider, Flex, Link, Spacer } from '@chakra-ui/layout';

export default function Navbar() {
  const { colorMode } = useColorMode();

  return (
    <nav>
      <Container maxW="container.xl">
        <Flex paddingY="8px">
          <Box>
            <Link href={Routes.Home}>
              <Image
                alt="Timothy Caish Logo"
                className="object-contain"
                src={
                  colorMode === 'light'
                    ? '/assets/logo/logo__light.png'
                    : '/assets/logo/logo__dark.png'
                }
                w={['75px', '100px']}
              />
            </Link>
          </Box>

          <Spacer />

          <Box></Box>
        </Flex>
      </Container>

      <Divider
        borderBottomWidth="3px"
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
      />
    </nav>
  );
}
