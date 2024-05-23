import AnimatedPressIn from '@/components/animation/AnimatedPressIn';
import { opaqueDarkBgColor, opaqueLightBgColor } from '@/constants/colors';
import { BORDER_RADIUS_DEFAULT } from '@/constants/settings';
import { Tables } from '@/constants/types/supabase';
import { useStore } from '@/zustand/store';
import { Image } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { BiChat, BiLike } from 'react-icons/bi';

export default function PortfolioCard(props: Tables<'portfolio_items'>) {
  const store = useStore();

  /**
   * Gets the release date of the portfolio item.
   * @returns {string} The release date of the portfolio item.
   */
  function getReleaseDate(): string {
    if (props.release_date) {
      return `Released: ${new Date(props.release_date).toLocaleDateString(
        store.locale,
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }
      )}`;
    }

    return 'Coming soon';
  }

  return (
    <Card
      bg={useColorModeValue(opaqueLightBgColor, opaqueDarkBgColor)}
      borderRadius={BORDER_RADIUS_DEFAULT}
      maxW="md"
    >
      <CardHeader>
        <Flex alignItems="center" flex={1} flexWrap="wrap">
          <Box>
            <Heading size="md">{props.title}</Heading>
            <Text>{getReleaseDate()}</Text>
          </Box>
        </Flex>
      </CardHeader>

      <CardBody pt={0}>
        <Text>{props.description}</Text>
      </CardBody>

      <Image
        alt={`${props.title} cover`}
        height={200}
        priority={true}
        src={props.image_url}
        style={{ objectFit: 'cover' }}
        width={500}
      />

      <CardFooter
        flexWrap="wrap"
        justify="space-between"
        sx={{
          '& > button': {
            minW: '136px'
          }
        }}
      >
        <AnimatedPressIn display="flex" flex={1} justifyContent="center">
          <Button
            flex={1}
            leftIcon={<Icon as={BiLike} boxSize={6} />}
            variant="ghost"
          >
            Like
          </Button>
        </AnimatedPressIn>

        <AnimatedPressIn display="flex" flex={1} justifyContent="center">
          <Button
            flex={1}
            leftIcon={<Icon as={BiChat} boxSize={6} />}
            variant="ghost"
          >
            Comment
          </Button>
        </AnimatedPressIn>
      </CardFooter>
    </Card>
  );
}
