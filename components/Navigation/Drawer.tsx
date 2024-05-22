'use client';

import AnimatedPressIn from '@/components/animation/AnimatedPressIn';
import Footer from '@/components/Footer';
import { Routes } from '@/constants/routes';
import { Link } from '@chakra-ui/next-js';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';

type NavigationDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NavigationDrawer(props: NavigationDrawerProps) {
  const { colorMode } = useColorMode();
  const routes = Routes();

  return (
    <Drawer
      isOpen={props.isOpen}
      onClose={props.onClose}
      placement="right"
      size="xs"
    >
      <DrawerOverlay backdropFilter="blur(10px)" bg="blackAlpha.300" />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader />

        <DrawerBody>
          <Flex alignItems="center" direction="column" me={4} gap={4}>
            {Object.values(routes).map((route) => (
              <Link href={route.path} key={route.name} onClick={props.onClose}>
                <AnimatedPressIn>
                  <Heading
                    color={useColorModeValue('gray.700', 'gray.300')}
                    fontWeight="semibold"
                    size="lg"
                  >
                    {route.name}
                  </Heading>
                </AnimatedPressIn>
              </Link>
            ))}
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Footer />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
