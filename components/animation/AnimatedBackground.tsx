import FadeIn from '@/components/animation/FadeIn';
import { Box, useColorModeValue } from '@chakra-ui/react';
import DrifterStars from '@devil7softwares/react-drifter-stars';

type AnimatedBackgroundProps = {
  shouldFadeIn: boolean;
};

/**
 * Animated background component.
 */
export default function AnimatedBackground(props: AnimatedBackgroundProps) {
  /**
   * Render the stars background with or without the fade in effect.
   */
  function renderStars() {
    return props.shouldFadeIn ? (
      <FadeIn duration={5}>
        <DrifterStars color={useColorModeValue('#0293D5', 'white')} />
      </FadeIn>
    ) : (
      <DrifterStars color={useColorModeValue('#0293D5', 'white')} />
    );
  }

  return (
    <Box
      bottom={0}
      h="100%"
      left={0}
      opacity={useColorModeValue(0.7, 0.3)}
      position="absolute"
      right={0}
      top={0}
      zIndex="-1"
    >
      {renderStars()}
    </Box>
  );
}
