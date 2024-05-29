import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import Skeleton from 'react-loading-skeleton';

export default function PortfolioCardCommentSkeleton() {
  const baseColor = useColorModeValue('#A0AEC0', '#718096');
  const highlightColor = useColorModeValue('#E2E8F0', '#A0AEC0');

  return (
    <Card bg={useColorModeValue('gray.200', 'gray.600')}>
      <CardHeader p={2}>
        <Stack spacing={4}>
          <Flex alignItems="center" flex={1} flexWrap="wrap" gap={4}>
            <Skeleton
              baseColor={baseColor}
              containerClassName="display-flex"
              circle={true}
              height="50px"
              highlightColor={highlightColor}
              width="50px"
            />

            <Flex direction="column" flex={1}>
              <Skeleton
                baseColor={baseColor}
                highlightColor={highlightColor}
                width="50%"
              />
              <Skeleton
                baseColor={baseColor}
                highlightColor={highlightColor}
                width="30%"
              />
            </Flex>
          </Flex>
        </Stack>
      </CardHeader>

      <CardBody p={2} pt={0}>
        <Skeleton
          baseColor={baseColor}
          highlightColor={highlightColor}
          width="95%"
        />
        <Skeleton
          baseColor={baseColor}
          highlightColor={highlightColor}
          width="65%"
        />
      </CardBody>
    </Card>
  );
}
