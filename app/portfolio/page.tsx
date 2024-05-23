'use client';

import PageContainer from '@/components/PageContainer';
import PortfolioCard from '@/components/PortfolioCard';
import { Tables } from '@/constants/types/supabase';
import { getPortfolioItems } from '@/services/supabase-database/getters/portfolio_items';
import { Center, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = React.useState<
    Tables<'portfolio_items'>[]
  >([]);

  // Fetch the portfolio items
  React.useEffect(() => {
    (async () => {
      const response = await getPortfolioItems();
      setPortfolioItems(response);
    })();
  }, []);

  return (
    <PageContainer>
      <Center flex={1} px={{ base: 2, sm: 4 }} py={{ base: 4, sm: 0 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {portfolioItems.map((portfolioItem, index) => (
            <PortfolioCard key={index} {...portfolioItem} />
          ))}
        </SimpleGrid>
      </Center>
    </PageContainer>
  );
}
