'use client';

import SkillCards from '@/components-features/expertise/SkillCards';
import Statistic from '@/components-features/expertise/Statistic';
import PageContainer from '@/components/PageContainer';
import TopEditorsChart from '@/components/charts/TopEditorsChart';
import TopLanguagesChart from '@/components/charts/TopLanguagesChart';
import { SupabaseEdgeFunctionUrls } from '@/constants/settings';
import { WakaTimeAllTimeStats } from '@/constants/types';
import { i18n } from '@/services/localization';
import { useStore } from '@/zustand/store';
import { Container, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export default function Expertise() {
  const store = useStore();

  const [dailyCodingStatsSubtitle, setDailyCodingStatsSubtitle] =
    React.useState(i18n.t('not_including_today'));
  const [dailyCodingStatsTitle, setDailyCodingStatsTitle] = React.useState(
    i18n.t('average_daily_hours_coding')
  );
  const [dailyCodingStatsValue, setDailyCodingStatsValue] = React.useState(0);

  const [totalCodingStatsSubtitle, setTotalCodingStatsSubtitle] =
    React.useState(i18n.t('since_elipsis'));
  const [totalCodingStatsTitle, setTotalCodingStatsTitle] = React.useState(
    i18n.t('total_hours_coding')
  );
  const [totalCodingStatsValue, setTotalCodingStatsValue] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(false);

  // Fetch coding stats and update language on locale change
  React.useEffect(() => {
    setDailyCodingStatsSubtitle(i18n.t('not_including_today'));
    setDailyCodingStatsTitle(i18n.t('average_daily_hours_coding'));

    setTotalCodingStatsSubtitle(i18n.t('since_elipsis'));
    setTotalCodingStatsTitle(i18n.t('total_hours_coding'));

    fetchCodingStats();
  }, [store.locale]);

  /**
   * Fetches the Wakatime coding stats.
   */
  async function fetchCodingStats() {
    try {
      setIsLoading(true);

      let storeUpdated = false;
      let wakatimeStats = store.wakatimeStats;

      // If the stats have not been fetched yet
      if (!store.wakatimeStats) {
        const response = await fetch(SupabaseEdgeFunctionUrls.WakatimeStats);
        wakatimeStats = (await response.json()) as WakaTimeAllTimeStats;

        store.setWakatimeStats(wakatimeStats);
        storeUpdated = true;
      }

      handleDailyAverageCodingStats(wakatimeStats);
      handleTotalCodingStats(wakatimeStats);

      // If the store was updated, no need to wait before setting loading to
      // false, but if it wasn't, wait a bit to show the loading spinner for
      // the Statistic component so that the AnimatedNumber component updates
      // correctly (such as when the language is changed).
      storeUpdated
        ? setIsLoading(false)
        : setTimeout(() => setIsLoading(false), 250);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  /**
   * Handles setting the daily average coding stats.
   * @param wakatimeStats The Wakatime stats.
   */
  function handleDailyAverageCodingStats(
    wakatimeStats: WakaTimeAllTimeStats | null
  ) {
    if (!wakatimeStats) return;

    const dailyAverageHoursCodingRounded =
      Math.round(
        (wakatimeStats.data.daily_average_including_other_language / 3600 +
          Number.EPSILON) *
          100
      ) / 100;

    setDailyCodingStatsValue(dailyAverageHoursCodingRounded);
  }

  /**
   * Handles setting the total coding stats.
   * @param wakatimeStats The Wakatime stats.
   */
  function handleTotalCodingStats(wakatimeStats: WakaTimeAllTimeStats | null) {
    if (!wakatimeStats) return;

    const codingSince = i18n.t('since_date', {
      date: new Date(wakatimeStats.data.start).toLocaleDateString(
        store.locale,
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
      )
    });
    const totalHoursCoding =
      Math.round(
        (wakatimeStats.data.total_seconds_including_other_language / 3600 +
          Number.EPSILON) *
          100
      ) / 100;

    setTotalCodingStatsSubtitle(codingSince);
    setTotalCodingStatsValue(totalHoursCoding);
  }

  return (
    <PageContainer>
      <Container maxW="container.xl" my={4} zIndex={0}>
        {/* Daily and total coding stats */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={4}
          justifyContent="space-around"
        >
          <Statistic
            isLoading={isLoading}
            subtitle={totalCodingStatsSubtitle}
            title={totalCodingStatsTitle}
            value={totalCodingStatsValue}
          />

          <Statistic
            isLoading={isLoading}
            subtitle={dailyCodingStatsSubtitle}
            title={dailyCodingStatsTitle}
            value={dailyCodingStatsValue}
          />
        </Flex>

        {/* Charts */}
        <Flex direction={{ base: 'column', lg: 'row' }} gap={4} mt={4}>
          <TopLanguagesChart isLoading={isLoading} />
          <TopEditorsChart isLoading={isLoading} />
        </Flex>

        {/* Disclaimer */}
        <Flex mt={2} justifyContent="center" px={{ base: 0, lg: 12 }}>
          <Text color="gray.500" fontSize="xs" textAlign="center">
            {i18n.t('coding_stats_disclaimer')}
          </Text>
        </Flex>

        {/* Other Skills */}
        <Heading mt={6}>{i18n.t('more_areas_of_expertise')}</Heading>
        <Flex mt={4}>
          <SkillCards />
        </Flex>
      </Container>
    </PageContainer>
  );
}
