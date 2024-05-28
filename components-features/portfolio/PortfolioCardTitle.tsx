import { Link } from '@chakra-ui/next-js';
import { Heading, useColorModeValue } from '@chakra-ui/react';

type PortfolioCardTitleProps = {
  learn_more_url?: string | null;
  title?: string;
};

export default function PortfolioCardTitle(props: PortfolioCardTitleProps) {
  return props.learn_more_url ? (
    <Link
      href={props.learn_more_url}
      target="_blank"
      title={props.learn_more_url}
    >
      <Heading
        color={useColorModeValue('primary.500', 'primary.200')}
        size="md"
      >
        {props.title}
      </Heading>
    </Link>
  ) : (
    <Heading size="md">{props.title}</Heading>
  );
}
