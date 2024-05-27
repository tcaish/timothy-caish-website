'use client';

import PageContainer from '@/components/PageContainer';
import PortfolioCard from '@/components/PortfolioCard';
import PortfolioCardCommentsModal from '@/components/PortfolioCardCommentsModal';
import PortfolioCardSkeleton from '@/components/PortfolioCardSkeleton';
import { Tables } from '@/constants/types/supabase';
import { getPortfolioItems } from '@/services/supabase-database/getters/portfolio_items';
import { useStore } from '@/zustand/store';
import { Center, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

export default function Portfolio() {
  const store = useStore();

  const [isLoading, setIsLoading] = React.useState(false);
  const [portfolioItems, setPortfolioItems] = React.useState<
    Tables<'portfolio_items'>[]
  >([]);

  // Fetch the portfolio items
  React.useEffect(() => {
    (async () => {
      setIsLoading(true);

      const response = await getPortfolioItems();
      setPortfolioItems(response);

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

          {portfolioItems.map((portfolioItem, index) => (
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
