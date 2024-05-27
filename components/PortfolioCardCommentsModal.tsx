import PortfolioCardTitle from '@/components/PortfolioCardTitle';
import { useStore } from '@/zustand/store';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';

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

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay backdropFilter="blur(10px) saturate(180%)" bg="none" />

      <ModalContent>
        <ModalHeader>
          <PortfolioCardTitle
            learn_more_url={portfolioItem?.learn_more_url}
            title={portfolioItem?.title}
          />
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody></ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
