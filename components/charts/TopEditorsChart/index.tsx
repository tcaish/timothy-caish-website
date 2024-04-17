import ChartContainer from '@/components/charts/ChartContainer';
import { i18n } from '@/services/localization';
import { useStore } from '@/zustand/store';
import { Box, Flex, Spinner, useColorMode } from '@chakra-ui/react';
import * as echarts from 'echarts';
import React from 'react';

type TopEditorsChartProps = {
  isLoading: boolean;
};

export default function TopEditorsChart(props: TopEditorsChartProps) {
  const { colorMode } = useColorMode();
  const store = useStore();

  const chartRef = React.useRef<echarts.ECharts | null>(null);

  // Initialize the pie chart
  React.useEffect(() => {
    if (!store.wakatimeStats?.data.editors || chartRef.current) return;

    // Create the echarts instance
    chartRef.current = echarts.init(
      document.getElementById('top-editors-chart')
    );
  }, [store.wakatimeStats?.data.editors]);

  // Update the chart when the chart instance exists and when the color mode
  // changes
  React.useEffect(() => {
    if (!chartRef.current || !store.wakatimeStats?.data.editors) return;

    // Create the data for the chart
    const data = store.wakatimeStats.data.editors.map((editor) => ({
      name: editor.name,
      value: editor.percent
    }));

    // Draw the chart
    chartRef.current.setOption({
      tooltip: {
        valueFormatter: (value: number) => `${value}%`
      },
      series: [
        {
          type: 'pie',
          label: {
            color: colorMode === 'dark' ? 'white' : '#2D3748',
            fontFamily: 'Inter',
            fontSize: 14,
            fontStyle: 'bold'
          },
          data
        }
      ]
    });
  }, [chartRef.current, store.wakatimeStats?.data.editors, colorMode]);

  return (
    <ChartContainer
      description={i18n.t('top_editors__description')}
      title={i18n.t('top_editors')}
    >
      {!store.wakatimeStats?.data.editors && props.isLoading ? (
        <Flex
          alignItems="center"
          direction="column"
          flexGrow={1}
          justifyContent="center"
        >
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex justifyContent="center">
          <Box h="400px" id="top-editors-chart" w="470px"></Box>
        </Flex>
      )}
    </ChartContainer>
  );
}
