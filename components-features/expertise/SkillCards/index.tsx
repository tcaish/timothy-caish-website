import SkillCard from '@/components-features/expertise/SkillCards/SkillCard';
import { Skill } from '@/constants/types';
import { openUrlInNewTab } from '@/helpers';
import { i18n } from '@/services/localization';
import { useStore } from '@/zustand/store';
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';

export default function SkillCards() {
  const store = useStore();

  const skills: Skill[] = [
    {
      alt: 'Amazon Web Services Logo',
      color: 'rgba(255,153,0,0.5)',
      description: i18n.t('aws_desc'),
      link: 'https://aws.amazon.com/',
      source: '/assets/brands/aws_logo.png',
      title: 'Amazon Web Services'
    },
    {
      alt: 'Django Logo',
      color: 'rgba(0, 60, 42, 0.5)',
      description: i18n.t('django_desc'),
      link: 'https://djangoproject.com/',
      source: '/assets/brands/django_logo.png',
      title: 'Django'
    },
    {
      alt: 'Chakra UI Logo',
      color: 'rgba(94, 201, 201, 0.5)',
      description: i18n.t('chakra_ui_desc'),
      link: 'https://chakra-ui.com/',
      source: '/assets/brands/chakra_ui_logo.png',
      title: 'Chakra UI'
    },
    {
      alt: 'Expo Logo',
      color: 'rgba(45, 55, 72, 0.5)',
      description: i18n.t('expo_desc'),
      link: 'https://expo.dev/',
      source: '/assets/brands/expo_logo.png',
      title: 'Expo'
    },
    {
      alt: 'Firebase Logo',
      color: 'rgba(255, 203, 43,0.5)',
      description: i18n.t('firebase_desc'),
      link: 'https://firebase.google.com/',
      source: '/assets/brands/firebase_logo.png',
      title: 'Firebase'
    },
    {
      alt: 'Framer Motion Logo',
      color: 'rgba(182, 73, 146, 0.5)',
      description: i18n.t('framer_motion_desc'),
      link: 'https://www.framer.com/motion/',
      source: '/assets/brands/framer_motion_logo.png',
      title: 'Framer Motion'
    },
    {
      alt: 'Next.js Logo',
      color: 'rgba(45, 55, 72,0.5)',
      description: i18n.t('nextjs_desc'),
      link: 'https://nextjs.org/',
      source: '/assets/brands/nextjs_logo.png',
      title: 'Next.js'
    },
    {
      alt: 'PostgreSQL Logo',
      color: 'rgba(48, 103, 146, 0.5)',
      description: i18n.t('postgresql_desc'),
      link: 'https://www.postgresql.org/',
      source: '/assets/brands/postgresql_logo.png',
      title: 'PostgreSQL'
    },
    {
      alt: 'React/React Native Logo',
      color: 'rgba(0, 210, 248, 0.5)',
      description: i18n.t('react_desc'),
      link: 'https://reactjs.org/',
      source: '/assets/brands/react_logo.png',
      title: 'React/React Native'
    },
    {
      alt: 'Supabase Logo',
      color: 'rgba(3,188,151,0.5)',
      description: i18n.t('supabase_desc'),
      link: 'https://supabase.io/',
      source: '/assets/brands/supabase_logo.png',
      title: 'Supabase'
    },
    {
      alt: 'Tailwind CSS Logo',
      color: 'rgba(59, 130, 246, 0.5)',
      description: i18n.t('tailwindcss_desc'),
      link: 'https://tailwindcss.com/',
      source: '/assets/brands/tailwindcss_logo.png',
      title: 'Tailwind CSS'
    }
  ];

  return (
    <>
      {/* Skill cards */}
      <Flex gap={4} grow={1} wrap="wrap">
        {skills.map((skill, index) => (
          <Flex
            basis="310px"
            cursor="pointer"
            grow={1}
            key={index}
            minH="230px"
            shrink={1}
          >
            <SkillCard index={index} key={index} skill={skill} />
          </Flex>
        ))}
      </Flex>

      {/* Skill card modal */}
      {store.skillCardIndexSelected != null && (
        <Modal
          isOpen={store.skillCardIndexSelected != null}
          motionPreset="slideInBottom"
          onClose={() => store.setSkillCardIndexSelected(null)}
          size="lg"
        >
          <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.300" />

          <ModalContent>
            <ModalHeader>
              {skills[store.skillCardIndexSelected].title}
            </ModalHeader>

            <ModalCloseButton />

            <ModalBody>
              {skills[store.skillCardIndexSelected].description}
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => {
                  store.setSkillCardIndexSelected(null);
                  openUrlInNewTab(
                    skills[store.skillCardIndexSelected as number].link
                  );
                }}
              >
                {i18n.t('learn_more')}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
