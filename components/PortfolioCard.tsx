import AnimatedPressIn from '@/components/animation/AnimatedPressIn';
import ConfettiExplosion from '@/components/animation/ConfettiExplosion';
import { opaqueDarkBgColor, opaqueLightBgColor } from '@/constants/colors';
import { BORDER_RADIUS_DEFAULT } from '@/constants/settings';
import { Tables } from '@/constants/types/supabase';
import { formatNumber } from '@/helpers';
import { LocalStorage } from '@/services/local-storage';
import { i18n } from '@/services/localization';
import { updatePortfolioItemTotalLikes } from '@/services/supabase-database/adders/portfolio_items';
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
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { BiChat, BiLike, BiSolidChat, BiSolidLike } from 'react-icons/bi';

export default function PortfolioCard(props: Tables<'portfolio_items'>) {
  const store = useStore();

  const likedInLocalStorage =
    localStorage
      .getItem(LocalStorage.Keys.PortfolioItemLikes)
      ?.includes(`id-${props.id}`) || false;

  const [liked, setLiked] = React.useState(likedInLocalStorage);
  const [previouslyLikedValue, setPreviouslyLikedValue] =
    React.useState(likedInLocalStorage);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [totalLikes, setTotalLikes] = React.useState(props.total_likes);

  const likeButtonRef = React.useRef<HTMLButtonElement>(null);

  const executeDatabaseActionTimer = React.useRef<NodeJS.Timeout | null>(null);

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
   * Adds the liked portfolio item to local storage.
   */
  function addLikedPortfolioItemToLocalStorage() {
    const jsonValue = JSON.parse(
      localStorage.getItem(LocalStorage.Keys.PortfolioItemLikes) || '{}'
    );
    jsonValue[`id-${props.id}`] = 'true';

    localStorage.setItem(
      LocalStorage.Keys.PortfolioItemLikes,
      JSON.stringify(jsonValue)
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
   * Handles what happens when the like button is clicked.
   */
  function handleLikeButtonClicked() {
    const userLikedItem = !liked;

    // If it is not liked
    if (userLikedItem) {
      if (!showConfetti) setShowConfetti(true);

      setLiked(true);
      setTotalLikes(totalLikes + 1);
    } else {
      setLiked(false);
      setTotalLikes(totalLikes - 1);
    }

    // If there is a timer running, clear it
    if (executeDatabaseActionTimer.current) {
      clearTimeout(executeDatabaseActionTimer.current);
    }

    // If the user didn't previously like or dislike the item before changing
    // their reaction, do nothing to avoid spamming
    if (previouslyLikedValue === userLikedItem) return;

    // Execute the database action after 2 seconds to prevent spamming
    executeDatabaseActionTimer.current = setTimeout(async () => {
      const success = await updatePortfolioItemTotalLikes(
        userLikedItem ? 'increment' : 'decrement',
        props.id
      );

      // If the action was successful
      if (success) {
        userLikedItem
          ? addLikedPortfolioItemToLocalStorage()
          : removeLikedPortfolioItemFromLocalStorage();
        setPreviouslyLikedValue(userLikedItem);
      }
    }, 2000);
  }

  /**
   * Removes the liked portfolio item from local storage.
   */
  function removeLikedPortfolioItemFromLocalStorage() {
    const jsonValue = JSON.parse(
      localStorage.getItem(LocalStorage.Keys.PortfolioItemLikes) || '{}'
    );
    delete jsonValue[`id-${props.id}`];

    localStorage.setItem(
      LocalStorage.Keys.PortfolioItemLikes,
      JSON.stringify(jsonValue)
    );
  }

  return (
    <React.Fragment>
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
                <Link
                  href={props.learn_more_url}
                  target="_blank"
                  title={props.learn_more_url}
                >
                  <Heading
                    color={useColorModeValue('primary.500', 'primary.200')}
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
          <Text>{i18n.t(`portfolio_descriptions.id-${props.id}`)}</Text>
        </CardBody>

        <Image
          alt={props.title}
          height={200}
          priority={true}
          src={props.image_url}
          style={{ objectFit: 'cover' }}
          width={500}
        />

        <Stack
          direction="row"
          flexWrap="wrap"
          justify="space-between"
          px={5}
          py={2}
          spacing={8}
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            <Icon
              as={BiSolidLike}
              boxSize={5}
              color={useColorModeValue('gray.700', 'white')}
            />
            <Text>{formatNumber(store.locale, totalLikes)}</Text>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={3}>
            <Icon
              as={BiSolidChat}
              boxSize={5}
              color={useColorModeValue('gray.700', 'white')}
            />
            <Text>{formatNumber(store.locale, 12354)}</Text>
          </Stack>
        </Stack>

        <CardFooter
          borderTopColor={useColorModeValue('gray.300', 'gray.500')}
          borderTopWidth={1}
          flexWrap="wrap"
          justify="space-between"
          p={2}
        >
          <AnimatedPressIn display="flex" flex={1} justifyContent="center">
            <Button
              color={
                !liked
                  ? useColorModeValue('gray.700', 'white')
                  : useColorModeValue('primary.500', 'primary.200')
              }
              flex={1}
              leftIcon={<Icon as={liked ? BiSolidLike : BiLike} boxSize={6} />}
              onClick={handleLikeButtonClicked}
              ref={likeButtonRef}
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

      <AnimatePresence>
        {likeButtonRef.current && showConfetti && (
          <ConfettiExplosion
            height={likeButtonRef.current.getBoundingClientRect().height}
            onConfettiComplete={() => setShowConfetti(false)}
            width={likeButtonRef.current.getBoundingClientRect().width}
            x={likeButtonRef.current.getBoundingClientRect().x}
            y={likeButtonRef.current.getBoundingClientRect().y}
          />
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
