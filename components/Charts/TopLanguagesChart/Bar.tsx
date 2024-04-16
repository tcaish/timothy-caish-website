import FadeIn from '@/components/Animation/FadeIn';
import { i18n } from '@/services/localization';
import { useStore } from '@/zustand/store';
import {
  Flex,
  Heading,
  Spacer,
  Text,
  useColorModeValue,
  useToken
} from '@chakra-ui/react';
import { motion, useMotionValue } from 'framer-motion';
import React from 'react';

export default function Bar(props: {
  hours: number;
  index: number;
  minutes: number;
  name: string;
  percent: number;
}) {
  const [primary200, primary600] = useToken(
    // the key within the theme, in this case `theme.colors`
    'colors',
    // the subkey(s), resolving to `theme.colors.red.100`
    ['primary.200', 'primary.600']
  );
  const store = useStore();

  const [height, setHeight] = React.useState(0);
  const targetRef = React.useRef<HTMLDivElement>(null);

  // Animated values
  const width = useMotionValue(0);

  // Set the initial height and width of the bar on layout
  React.useLayoutEffect(() => {
    if (targetRef.current) {
      setHeight(targetRef.current.offsetHeight);
      width.set(targetRef.current.offsetWidth);
    }
  }, []);

  // Update the width of the bar on window resize
  React.useEffect(() => {
    targetRef.current && width.set(targetRef.current.offsetWidth);
  }, [store.windowWidth]);

  return (
    <Flex
      alignItems="center"
      mt={props.index !== 0 ? 3 : 0}
      position="relative"
      py={2}
      ref={targetRef}
    >
      {/* Animated background bar */}
      <motion.div
        initial={{
          width: 0
        }}
        animate={{
          backgroundColor: [
            useColorModeValue(primary600, primary200),
            useColorModeValue(primary200, primary600)
          ],
          width: width.get() * (props.percent / 100)
        }}
        transition={{
          delay: props.index * 0.1 + 0.35, // Adding 0.35 to fix initial glitch in animation due to the component rendering
          duration: 1
        }}
        style={{
          borderRadius: 8,
          height: height,
          position: 'absolute',
          zIndex: 0
        }}
      ></motion.div>

      {/* Language name and hours */}
      <Flex direction="column" ps={2} zIndex={1}>
        <FadeIn>
          <Heading color={useColorModeValue('gray.600', 'gray.200')} size="sm">
            {props.hours} {i18n.t('hours_short')} {props.minutes}{' '}
            {i18n.t('minutes_short')}
          </Heading>
        </FadeIn>

        <FadeIn>
          <Heading size="md">{props.name}</Heading>
        </FadeIn>
      </Flex>

      <Spacer />

      {/* Percentage */}
      <FadeIn>
        <Text pe={2} zIndex={1}>
          {props.percent.toLocaleString(store.locale)}%
        </Text>
      </FadeIn>
    </Flex>
  );
}
