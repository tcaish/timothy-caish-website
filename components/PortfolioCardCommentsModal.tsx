import GhostJson from '@/assets/lottie/ghost.json';
import PortfolioCardTitle from '@/components/PortfolioCardTitle';
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
  Text
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

        <Text mt={0}>
          There are no comments for this portfolio item yet. Be the first to
          leave a comment!
        </Text>
      </Stack>
    );
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay backdropFilter="blur(10px) saturate(180%)" bg="none" />

      <ModalContent>
        <ModalHeader>
          <PortfolioCardTitle
            learn_more_url={portfolioItem?.learn_more_url}
            title={portfolioItem?.title}
          />
          <Heading size="md">Comments</Heading>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <EmptyComments />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={props.onClose}>
            Close
          </Button>

          <Button colorScheme="primary">Add Comment</Button>
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
