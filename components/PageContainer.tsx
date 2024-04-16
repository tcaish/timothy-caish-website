import AnimatedBackground from '@/components/Animation/AnimatedBackground';
import FullPageBlur from '@/components/FullPageBlur';
import { useStore } from '@/zustand/store';

type PageContainerProps = {
  children: React.ReactNode;
};

export default function PageContainer(props: PageContainerProps) {
  const store = useStore();

  return (
    <>
      <AnimatedBackground shouldFadeIn={true} />

      {store.showLanguagesMenu && <FullPageBlur />}

      {props.children}
    </>
  );
}
