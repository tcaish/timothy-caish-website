import { generateMetaData } from '@/helpers';
import { Flex } from '@chakra-ui/react';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetaData({
  title: 'Contact Me',
  description:
    "Contact me directly via email or use the contact form on this page. I'm eager to hear from you and respond to your queries or feedback!"
});

export default function ContactLayout({
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
