'use client';

import DeveloperJson from '@/assets/lottie/developer.json';
import Navbar from '@/components/Navbar';
import { useColorMode } from '@chakra-ui/color-mode';
import { Box, Center, Flex, Heading } from '@chakra-ui/layout';
import Lottie from 'lottie-react';
import { Balancer } from 'react-wrap-balancer';

export default function Home() {
  const { colorMode } = useColorMode();

  return (
    <Flex direction="column" h="100%">
      <Navbar />

      <Flex
        direction={{ base: 'column', lg: 'row' }}
        h="100%"
        justifyContent="space-between"
      >
        <Center flexBasis={0} flexGrow={1}>
          <Box textAlign="center">
            <Balancer>
              <Heading color={colorMode === 'dark' ? 'white' : 'gray.700'}>
                Hello, world 👋🏼 My name is Timothy Caish, and I am a
              </Heading>
            </Balancer>

            <Balancer>
              <Heading color={colorMode === 'dark' ? 'white' : 'gray.700'}>
                full-stack web developer.
              </Heading>
            </Balancer>
          </Box>
        </Center>

        <Center flexBasis={0} flexGrow={1}>
          <Box>
            <Lottie
              animationData={DeveloperJson}
              style={styles.developer_lottie}
            />
          </Box>
        </Center>
      </Flex>
    </Flex>
  );
}

const styles = {
  developer_lottie: {
    width: '100%',
    height: '400px'
  }
};
