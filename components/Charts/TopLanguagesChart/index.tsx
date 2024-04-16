import ChartContainer from '@/components/Charts/ChartContainer';
import { i18n } from '@/services/localization';
import { useStore } from '@/zustand/store';
import { Flex, Spinner } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

type CodingLanguagesChartProps = {
  isLoading: boolean;
};

// We have to dynamically import the bar component due to the use of
// the <FadeIn />, which is not supported in server-side rendering.
const Bar = dynamic(() => import('./Bar'), {
  ssr: false
});

export default function CodingLanguagesChart(props: CodingLanguagesChartProps) {
  const store = useStore();

  return (
    <ChartContainer
      description={i18n.t('top_languages__description')}
      title={i18n.t('top_languages')}
    >
      {!store.wakatimeStats?.data.languages && props.isLoading && (
        <Flex
          alignItems="center"
          direction="column"
          flexGrow={1}
          justifyContent="center"
        >
          <Spinner size="xl" />
        </Flex>
      )}

      {store.wakatimeStats?.data.languages
        .slice(0, 6)
        .map((language, index) => (
          <Bar
            hours={language.hours}
            index={index}
            key={index}
            minutes={language.minutes}
            name={language.name}
            percent={language.percent}
          />
        ))}
    </ChartContainer>
  );
}
