'use client';

import PortfolioCard from '@/components-features/portfolio/PortfolioCard';
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

      const response = await getPortfolioItems();
      store.setPortfolioItems(response);

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

  return (
    <PageContainer>
      <Center flex={1} px={{ base: 2, sm: 4 }} py={{ base: 4, sm: 0 }}>
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
    </PageContainer>
  );
}
