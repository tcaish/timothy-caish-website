import { useColorMode } from '@chakra-ui/color-mode';
import DrifterStars from '@devil7softwares/react-drifter-stars';

/**
 * Animated background component.
 */
export default function AnimatedBackground() {
  const { colorMode } = useColorMode();

  const styles = {
    main: {
      bottom: 0,
      height: '100%',
      left: 0,
      opacity: colorMode === 'dark' ? 0.3 : 1,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: '-1'
    }
  };

  return (
    <DrifterStars
      color={colorMode === 'dark' ? 'white' : '#0293D5'}
      style={styles.main as React.CSSProperties}
    />
  );
}
