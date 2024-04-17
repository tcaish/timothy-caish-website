import { opaqueDarkBgColor, opaqueLightBgColor } from '@/constants/colors';
import { BORDER_RADIUS_DEFAULT } from '@/constants/settings';
import { Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';

type ChartContainerProps = {
  children: React.ReactNode;
  description: string;
  title: string;
};

export default function ChartContainer(props: ChartContainerProps) {
  return (
    <Flex
      bg={useColorModeValue(opaqueLightBgColor, opaqueDarkBgColor)}
      borderRadius={BORDER_RADIUS_DEFAULT}
      direction="column"
      flexGrow={1}
      minH="491px"
      p={2}
      w="100%"
    >
      <Flex direction="column" mb={4}>
        <Heading>{props.title}</Heading>
        <Text mt={1}>{props.description}</Text>
      </Flex>

      {props.children}
    </Flex>
  );
}
