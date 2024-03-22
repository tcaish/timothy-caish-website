import { useColorMode } from '@chakra-ui/react';
import './index.scss';

export default function FullPageBlur() {
  const { colorMode } = useColorMode();

  return (
    <div
      className="full-page-blur"
      id={colorMode === 'dark' ? 'full-page-blur-dark' : 'full-page-blur-light'}
    />
  );
}
