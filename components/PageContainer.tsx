import AnimatedBackground from '@/components/animation/AnimatedBackground';
import FullPageBlur from '@/components/FullPageBlur';
import { useStore } from '@/zustand/store';
import { AnimatePresence } from 'framer-motion';

type PageContainerProps = {
  children: React.ReactNode;
};

export default function PageContainer(props: PageContainerProps) {
  const store = useStore();

  return (
    <>
      <AnimatedBackground shouldFadeIn={true} />

      <AnimatePresence>
        {store.showLanguagesMenu && <FullPageBlur />}
      </AnimatePresence>

      {props.children}
    </>
  );
}
