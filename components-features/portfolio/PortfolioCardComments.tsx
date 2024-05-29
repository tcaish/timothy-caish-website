import GhostJson from '@/assets/lottie/ghost.json';
import PortfolioCardComment from '@/components-features/portfolio/PortfolioCardComment';
import PortfolioCardCommentSkeleton from '@/components-features/portfolio/PortfolioCardCommentSkeleton';
import { CONTENT_SIZE_LIMIT } from '@/constants/settings';
import { Tables } from '@/constants/types/supabase';
import { i18n } from '@/services/localization';
import { getPortfolioItemComments } from '@/services/supabase-database/getters/portfolio_item_comments';
import { useStore } from '@/zustand/store';
import { Button, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import React from 'react';

export default function PortfolioCardComments() {
  const store = useStore();
  const toast = useToast();

  const [comments, setComments] = React.useState<
    Tables<'portfolio_item_comments'>[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingMoreComments, setIsLoadingMoreComments] =
    React.useState(false);

  // Get the comments for the portfolio item
  React.useEffect(() => {
    fetchComments();
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

  /**
   * Fetches the portfolio item comments.
   * @param fetchAdditional Whether or not to fetch the next set of comments.
   */
  async function fetchComments(fetchAdditional = false) {
    if (!store.portfolioItemIdSelected) return;

    fetchAdditional ? setIsLoadingMoreComments(true) : setIsLoading(true);

    // Get the comments for the portfolio item
    const response = await getPortfolioItemComments(
      store.portfolioItemIdSelected,
      fetchAdditional
    );

    // If there was an error loading the comments
    if (response.error) {
      fetchAdditional ? setIsLoadingMoreComments(false) : setIsLoading(false);
      toast({
        description: i18n.t('error__loading_comments__desc'),
        isClosable: true,
        status: 'error'
      });
      return;
    }

    let tempComments: Tables<'portfolio_item_comments'>[] = [];

    // If there are comments
    if (response.comments) {
      tempComments = fetchAdditional
        ? [...comments, ...response.comments]
        : response.comments;
    }

    // Sort ascending based on the created_at date
    tempComments.sort((a, b) => {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });

    setComments(tempComments);
    fetchAdditional ? setIsLoadingMoreComments(false) : setIsLoading(false);
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
              {comments.map((comment, index) => (
                <React.Fragment>
                  <PortfolioCardComment key={comment.id} {...comment} />

                  {index === comments.length - 1 &&
                    comments.length % CONTENT_SIZE_LIMIT === 0 && (
                      <Flex justifyContent="center">
                        <Button
                          colorScheme="primary"
                          isLoading={isLoadingMoreComments}
                          onClick={() => fetchComments(true)}
                          variant="link"
                        >
                          {i18n.t('load_more_comments')}
                        </Button>
                      </Flex>
                    )}
                </React.Fragment>
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
