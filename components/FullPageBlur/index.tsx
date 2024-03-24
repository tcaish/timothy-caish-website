import { useStore } from '@/zustand/store';
import { Box, useColorModeValue } from '@chakra-ui/react';
import './index.scss';

/**
 * Full page blur component.
 */
export default function FullPageBlur() {
  const store = useStore();

  return (
    <Box
      className="full-page-blur"
      id={useColorModeValue('full-page-blur-light', 'full-page-blur-dark')}
      onClick={() => store.setShowLanguagesMenu(false)}
    />
  );
}
