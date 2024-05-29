'use client';

import PortfolioCard from '@/components-features/portfolio/PortfolioCard';
import PortfolioCardAddCommentModal from '@/components-features/portfolio/PortfolioCardAddCommentModal';
import PortfolioCardCommentsModal from '@/components-features/portfolio/PortfolioCardCommentsModal';
import PortfolioCardSkeleton from '@/components-features/portfolio/PortfolioCardSkeleton';
import PageContainer from '@/components/PageContainer';
import { getPortfolioItems } from '@/services/supabase-database/getters/portfolio_items';
import { useStore } from '@/zustand/store';
import { Center, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

export default function Portfolio() {
  const store = useStore();

  const [isLoading, setIsLoading] = React.useState(false);

  // Fetch the portfolio items
  React.useEffect(() => {
    (async () => {
      setIsLoading(true);

      const items = await getPortfolioItems();

      // Sort descending by release_date
      items.sort((a, b) => {
        if (a.release_date && b.release_date) {
          return (
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
          );
        }

        return 0;
      });

      store.setPortfolioItems(items);
      setIsLoading(false);
    })();
  }, []);

  /**
   * Handles what happens when the user closes the portfolio card comments
   * modal.
   */
  function handleClosePortfolioCardCommentsModal() {
    store.setPortfolioCardCommentsModalIsOpen(false);
    store.setPortfolioItemIdSelected(null);
  }

  /**
   * Handles what happens when the user closes the portfolio card add comment
   * modal.
   */
  function handleClosePortfolioCardAddCommentModal() {
    store.setPortfolioCardAddCommentModalIsOpen(false);
  }

  return (
    <PageContainer>
      <Center flex={1} px={{ base: 2, sm: 4 }} py={4}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {isLoading && (
            <React.Fragment>
              <PortfolioCardSkeleton />
              <PortfolioCardSkeleton />
              <PortfolioCardSkeleton />
            </React.Fragment>
          )}

          {store.portfolioItems.map((portfolioItem, index) => (
            <PortfolioCard key={index} {...portfolioItem} />
          ))}
        </SimpleGrid>
      </Center>

      <PortfolioCardCommentsModal
        isOpen={store.portfolioCardCommentsModalIsOpen}
        onClose={handleClosePortfolioCardCommentsModal}
      />

      <PortfolioCardAddCommentModal
        isOpen={store.portfolioCardAddCommentModalIsOpen}
        onClose={handleClosePortfolioCardAddCommentModal}
      />
    </PageContainer>
  );
}
