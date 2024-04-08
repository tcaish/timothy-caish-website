import { StatisticType } from '@/constants/types';
import { i18n } from '@/services/localization';
import {
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';

// We have to dynamically import the AnimatedNumber component, which is not
// supported in server-side rendering.
const AnimatedNumber = dynamic(() => import('react-animated-numbers'), {
  ssr: false
});

interface StatisticProps extends StatisticType {
  isLoading: boolean;
}

export default function Statistic(props: StatisticProps) {
  return (
    <Stat display="flex" justifyContent={{ base: 'start', md: 'center' }}>
      <StatLabel fontSize="md">{props.title}</StatLabel>

      {/* The minH of 36px is to fix the quick change of height when transitioning from the spinner to the number */}
      <StatNumber color={useColorModeValue('gray.700', 'white')} minH="36px">
        {props.isLoading || !props.value ? (
          <Spinner />
        ) : (
          <AnimatedNumber
            animateToNumber={props.value}
            includeComma
            locale={i18n.locale}
            transitions={(index) => ({
              type: 'spring',
              duration: index * 0.5
            })}
          />
        )}
      </StatNumber>

      <StatHelpText>{props.subtitle}</StatHelpText>
    </Stat>
  );
}
