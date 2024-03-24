import FadeIn from '@/components/FadeIn';
import { useColorMode } from '@chakra-ui/color-mode';
import { Box } from '@chakra-ui/react';
import DrifterStars from '@devil7softwares/react-drifter-stars';

type AnimatedBackgroundProps = {
  shouldFadeIn: boolean;
};

/**
 * Animated background component.
 */
export default function AnimatedBackground(props: AnimatedBackgroundProps) {
  const { colorMode } = useColorMode();

  /**
   * Render the stars background with or without the fade in effect.
   */
  function renderStars() {
    return props.shouldFadeIn ? (
      <FadeIn duration={5}>
        <DrifterStars color={colorMode === 'dark' ? 'white' : '#0293D5'} />
      </FadeIn>
    ) : (
      <DrifterStars color={colorMode === 'dark' ? 'white' : '#0293D5'} />
    );
  }

  return (
    <Box
      bottom={0}
      h="100%"
      left={0}
      opacity={colorMode === 'dark' ? 0.3 : 1}
      position="absolute"
      right={0}
      top={0}
      zIndex="-1"
    >
      {renderStars()}
    </Box>
  );
}
