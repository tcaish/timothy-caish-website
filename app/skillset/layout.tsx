import { generateMetaData } from '@/helpers';
import { Flex } from '@chakra-ui/react';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetaData({
  title: 'My Skillset',
  description: 'A list of my skills and technologies I use.'
});

export default function SkillsetLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex basis={0} grow={1}>
      {children}
    </Flex>
  );
}
