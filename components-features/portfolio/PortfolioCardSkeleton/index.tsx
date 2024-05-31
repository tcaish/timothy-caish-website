import { opaqueDarkBgColor, opaqueLightBgColor } from '@/constants/colors';
import { BORDER_RADIUS_DEFAULT } from '@/constants/settings';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './index.scss';

export default function PortfolioCardSkeleton() {
  const baseColor = useColorModeValue('#A0AEC0', '#718096');
  const highlightColor = useColorModeValue('#E2E8F0', '#A0AEC0');

  return (
    <Card
      bg={useColorModeValue(opaqueLightBgColor, opaqueDarkBgColor)}
      borderRadius={BORDER_RADIUS_DEFAULT}
      maxW="md"
    >
      <CardHeader>
        {/* This component is needed to make sure the card's width is as wide as
        it can get. If this wasn't here, the card would be very small and not
        look normal. */}
        <Text h={0} opacity={0}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>

        <Skeleton
          baseColor={baseColor}
          highlightColor={highlightColor}
          width="75%"
        />
        <Skeleton
          baseColor={baseColor}
          highlightColor={highlightColor}
          width="40%"
        />
      </CardHeader>

      <CardBody pt={0}>
        <Skeleton
          baseColor={baseColor}
          count={6}
          highlightColor={highlightColor}
        />
      </CardBody>

      <Skeleton
        baseColor={baseColor}
        height="200px"
        highlightColor={highlightColor}
      />

      <Stack direction="row" justify="space-between" px={5} pb={2} pt={4}>
        <Skeleton
          baseColor={baseColor}
          containerClassName="display-flex flex-1"
          height="20px"
          highlightColor={highlightColor}
          width="40%"
        />

        <Skeleton
          baseColor={baseColor}
          containerClassName="display-flex flex-1 justify-content-end"
          height="20px"
          highlightColor={highlightColor}
          width="40%"
        />
      </Stack>

      <CardFooter
        borderTopColor={useColorModeValue('gray.300', 'gray.500')}
        borderTopWidth={1}
        gap={32}
        justify="space-between"
        px={2}
        pb={3}
        pt={2}
      >
        <Skeleton
          baseColor={baseColor}
          containerClassName="flex-1"
          height="30px"
          highlightColor={highlightColor}
        />
        <Skeleton
          baseColor={baseColor}
          containerClassName="flex-1"
          height="30px"
          highlightColor={highlightColor}
        />
      </CardFooter>
    </Card>
  );
}
