import PortfolioCardComments from '@/components-features/portfolio/PortfolioCardComments';
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
  useColorModeValue
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
          <PortfolioCardComments />
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
