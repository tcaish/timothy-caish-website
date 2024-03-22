import { useStore } from '@/zustand/store';
import { Box, useColorMode } from '@chakra-ui/react';
import './index.scss';

/**
 * Full page blur component.
 */
export default function FullPageBlur() {
  const { colorMode } = useColorMode();
  const store = useStore();

  return (
    <Box
      className="full-page-blur"
      id={colorMode === 'dark' ? 'full-page-blur-dark' : 'full-page-blur-light'}
      onClick={() => store.setShowLanguagesMenu(false)}
    />
  );
}
