import AnimatedPressIn from '@/components/animation/AnimatedPressIn';
import { opaqueDarkBgColor, opaqueLightBgColor } from '@/constants/colors';
import { BORDER_RADIUS_DEFAULT } from '@/constants/settings';
import { Tables } from '@/constants/types/supabase';
import { i18n } from '@/services/localization';
import { useStore } from '@/zustand/store';
import { Image, Link } from '@chakra-ui/next-js';
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
   * Component that shows the type of the portfolio item as a badge.
   */
  function PortfolioItemType(): React.ReactNode {
    let bgColor = '#38A169';
    let text = '';

    switch (props.type) {
      case 'app':
        bgColor = '#00B5D8';
        text = i18n.t('mobile_app');
        break;
      case 'npm':
        bgColor = '#CB3837';
        text = i18n.t('npm_package');
        break;
      case 'website':
        text = i18n.t('website');
        break;
    }

    return (
      <Box
        backgroundColor={bgColor}
        borderTopRightRadius={BORDER_RADIUS_DEFAULT}
        px={2}
        position="absolute"
        right={0}
      >
        <Text color="white">{text}</Text>
      </Box>
    );
  }

  /**
   * Gets the release date of the portfolio item.
   * @returns {string} The release date of the portfolio item.
   */
  function getReleaseDate(): string {
    if (props.release_date) {
      return `${i18n.t('released')}: ${new Date(
        props.release_date
      ).toLocaleDateString(store.locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })}`;
    }

    return i18n.t('coming_soon');
  }

  /**
   * Gets the description of the portfolio item based on the title coming from
   * the database.
   * @returns {string} The description of the portfolio item.
   */
  function getDescription(): string {
    switch (props.title) {
      case 'react-cookies-consent':
        return i18n.t('portfolio_descriptions.react-cookies-consent');
      default:
        return '';
    }
  }

  return (
    <Card
      bg={useColorModeValue(opaqueLightBgColor, opaqueDarkBgColor)}
      borderRadius={BORDER_RADIUS_DEFAULT}
      maxW="md"
    >
      <PortfolioItemType />

      <CardHeader mt={2}>
        <Flex alignItems="center" flex={1} flexWrap="wrap">
          <Box>
            {props.learn_more_url ? (
              <Link href={props.learn_more_url} target="_blank">
                <Heading
                  color={useColorModeValue('blue.500', 'blue.200')}
                  size="md"
                >
                  {props.title}
                </Heading>
              </Link>
            ) : (
              <Heading size="md">{props.title}</Heading>
            )}

            <Text>{getReleaseDate()}</Text>
          </Box>
        </Flex>
      </CardHeader>

      <CardBody pt={0}>
        <Text>{getDescription()}</Text>
      </CardBody>

      <Image
        alt={props.title}
        height={200}
        priority={true}
        src={props.image_url}
        style={{ objectFit: 'cover' }}
        width={500}
      />

      <CardFooter flexWrap="wrap" justify="space-between">
        <AnimatedPressIn display="flex" flex={1} justifyContent="center">
          <Button
            color={useColorModeValue('gray.700', 'white')}
            flex={1}
            leftIcon={<Icon as={BiLike} boxSize={6} />}
            variant="ghost"
          >
            {i18n.t('like')}
          </Button>
        </AnimatedPressIn>

        <AnimatedPressIn display="flex" flex={1} justifyContent="center">
          <Button
            color={useColorModeValue('gray.700', 'white')}
            flex={1}
            leftIcon={<Icon as={BiChat} boxSize={6} />}
            variant="ghost"
          >
            {i18n.t('comment')}
          </Button>
        </AnimatedPressIn>
      </CardFooter>
    </Card>
  );
}
