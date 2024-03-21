import { useColorMode } from '@chakra-ui/color-mode';
import './index.scss';

export default function AnimatedBackground() {
  const { colorMode } = useColorMode();

  const styles = {
    main: {
      backgroundImage:
        colorMode === 'dark'
          ? 'linear-gradient(-45deg, #0a2647, #144272, #205295, #2c74b3)'
          : 'linear-gradient(-45deg, #f7fbfc, #d6e6f2, #b9d7ea, #769fcd)',
      backgroundSize: '400% 400%',
      height: '100%',
      position: 'absolute',
      width: '100%',
      zIndex: '-1'
    }
  };

  return (
    <div id="animated-background" style={styles.main as React.CSSProperties} />
  );
}
