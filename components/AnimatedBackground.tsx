import { useColorMode } from '@chakra-ui/color-mode';
import DrifterStars from '@devil7softwares/react-drifter-stars';

export default function AnimatedBackground() {
  const { colorMode } = useColorMode();

  const styles = {
    main: {
      height: '100%',
      opacity: colorMode === 'dark' ? 0.3 : 1,
      position: 'absolute',
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
