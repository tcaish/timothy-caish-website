import GhostJson from '@/assets/lottie/ghost.json';
import PortfolioCardComment from '@/components-features/portfolio/PortfolioCardComment';
import PortfolioCardCommentSkeleton from '@/components-features/portfolio/PortfolioCardCommentSkeleton';
import { Tables } from '@/constants/types/supabase';
import { i18n } from '@/services/localization';
import { getPortfolioItemComments } from '@/services/supabase-database/getters/portfolio_item_comments';
import { useStore } from '@/zustand/store';
import { Stack, Text, useToast } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import React from 'react';

export default function PortfolioCardComments() {
  const store = useStore();
  const toast = useToast();

  const [comments, setComments] = React.useState<
    Tables<'portfolio_item_comments'>[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // Get the comments for the portfolio item
  React.useEffect(() => {
    (async () => {
      if (!store.portfolioItemIdSelected) return;

      setIsLoading(true);

      // Get the comments for the portfolio item
      const response = await getPortfolioItemComments(
        store.portfolioItemIdSelected
      );

      // If there was an error loading the comments
      if (response.error) {
        setIsLoading(false);
        toast({
          description: i18n.t('error__loading_comments__desc'),
          isClosable: true,
          status: 'error'
        });
        return;
      }

      setComments(response.comments ?? []);
      setIsLoading(false);
    })();
  }, []);

  /**
   * Component that shows a message when there are no comments for a portfolio
   * item.
   * @returns {React.ReactNode} The component that shows the message.
   */
  function EmptyComments(): React.ReactNode {
    return (
      <Stack
        alignItems="center"
        direction="column"
        gap={0}
        justifyContent="center"
        textAlign="center"
      >
        <Lottie animationData={GhostJson} style={styles.ghost_lottie} />
        <Text mt={0}>{i18n.t('no_comments_yet')}</Text>
      </Stack>
    );
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <Stack spacing={3}>
          <PortfolioCardCommentSkeleton />
          <PortfolioCardCommentSkeleton />
          <PortfolioCardCommentSkeleton />
        </Stack>
      ) : (
        <React.Fragment>
          {comments.length === 0 ? (
            <EmptyComments />
          ) : (
            <Stack spacing={3}>
              {comments.map((comment) => (
                <PortfolioCardComment key={comment.id} {...comment} />
              ))}
            </Stack>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

const styles = {
  ghost_lottie: {
    width: '60%',
    height: '100%'
  }
};
