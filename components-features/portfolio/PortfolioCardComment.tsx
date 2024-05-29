import { Tables } from '@/constants/types/supabase';
import { i18n } from '@/services/localization';
import { useStore } from '@/zustand/store';
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

export default function PortfolioCardComment(
  props: Tables<'portfolio_item_comments'>
) {
  const store = useStore();

  return (
    <Card
      bg={useColorModeValue('gray.200', 'gray.600')}
      _hover={{ opacity: 0.8 }}
    >
      <CardHeader p={2}>
        <Stack spacing={4}>
          <Flex alignItems="center" flex={1} flexWrap="wrap" gap={4}>
            <Avatar name={props.name || undefined} />

            <Box>
              <Heading size="sm">
                {props.name || i18n.t('anonymous_user')}
              </Heading>

              <Text
                color={useColorModeValue('gray.500', 'gray.300')}
                fontSize="sm"
              >
                {new Date(props.created_at).toLocaleString(store.locale)}
              </Text>
            </Box>
          </Flex>
        </Stack>
      </CardHeader>

      <CardBody p={2} pt={0}>
        <Text>{props.comment}</Text>
      </CardBody>
    </Card>
  );
}
