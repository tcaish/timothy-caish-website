import { MotionBox } from '@/components/animation/MotionBox';
import { useStore } from '@/zustand/store';
import { useColorModeValue } from '@chakra-ui/react';
import './index.scss';

/**
 * Full page blur component.
 */
export default function FullPageBlur() {
  const store = useStore();

  return (
    <MotionBox
      animate={{ opacity: 1 }}
      className="full-page-blur"
      exit={{ opacity: 0 }}
      id={useColorModeValue('full-page-blur-light', 'full-page-blur-dark')}
      initial={{ opacity: 0 }}
      onClick={() => store.setShowLanguagesMenu(false)}
    />
  );
}
