import { MotionBox } from '@/components/animation/MotionBox';
import { ChakraProps } from '@chakra-ui/react';

interface AnimatedPressInProps extends ChakraProps {
  children: React.ReactNode;
}

/**
 * AnimatedPressIn is a component that scales down the children when pressed.
 */
export default function AnimatedPressIn(props: AnimatedPressInProps) {
  const { children, maxHeight, ...rest } = props;

  return (
    <MotionBox
      maxHeight={maxHeight ?? 'unset'}
      whileTap={{ scale: 0.8 }}
      {...rest}
    >
      {children}
    </MotionBox>
  );
}
