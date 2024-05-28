import GhostJson from '@/assets/lottie/ghost.json';
import PortfolioCardTitle from '@/components-features/portfolio/PortfolioCardTitle';
import { i18n } from '@/services/localization';
import { useStore } from '@/zustand/store';
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import Lottie from 'lottie-react';

type PortfolioCardCommentsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PortfolioCardCommentsModal(
  props: PortfolioCardCommentsModalProps
) {
  const store = useStore();

  const portfolioItem = store.portfolioItems.find(
    (item) => item.id === store.portfolioItemIdSelected
  );

  /**
   * Component that shows a message when there are no comments for a portfolio
   * item.
   * @returns {React.ReactNode} The component that shows the message.
   */
  function EmptyComments(): React.ReactNode {
    return (
      <Stack
        alignItems="center"
        direction="column"
        gap={0}
        justifyContent="center"
        textAlign="center"
      >
        <Lottie animationData={GhostJson} style={styles.ghost_lottie} />
        <Text mt={0}>{i18n.t('no_comments_yet')}</Text>
      </Stack>
    );
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay
        backdropFilter="blur(10px) saturate(180%)"
        bg={useColorModeValue('rgba(0, 0, 0, 0.1)', 'none')}
      />

      <ModalContent>
        <ModalHeader>
          <PortfolioCardTitle
            learn_more_url={portfolioItem?.learn_more_url}
            title={portfolioItem?.title}
          />
          <Heading size="md">{i18n.t('comments')}</Heading>
        </ModalHeader>

        <ModalCloseButton title={i18n.t('close')} />

        <ModalBody>
          <EmptyComments />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={props.onClose}>
            {i18n.t('close')}
          </Button>

          <Button
            colorScheme="primary"
            onClick={() => store.setPortfolioCardAddCommentModalIsOpen(true)}
          >
            {i18n.t('add_comment')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const styles = {
  ghost_lottie: {
    width: '60%',
    height: '100%'
  }
};
