import { generateMetaData } from '@/helpers';
import { Flex } from '@chakra-ui/react';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetaData({
  title: 'Expertise',
  description:
    "With years of experience, I specialize in creating responsive, user-friendly websites and innovative mobile apps tailored to meet business needs. Explore my areas of expertise and let's bring your digital vision to life!"
});

export default function ExpertiseLayout({
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
