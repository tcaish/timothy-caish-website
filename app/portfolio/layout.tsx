import { generateMetaData } from '@/helpers';
import { Flex } from '@chakra-ui/react';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetaData({
  title: 'Portfolio',
  description:
    "Check out my portfolio to see some of the projects I've worked on!"
});

export default function PortfolioLayout({
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
