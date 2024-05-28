import PortfolioCardTitle from '@/components-features/portfolio/PortfolioCardTitle';
import { i18n } from '@/services/localization';
import { useStore } from '@/zustand/store';
import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  Textarea
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormInputs = {
  comment: string;
  disclaimer: boolean;
  name: string;
};

type PortfolioCardAddCommentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PortfolioCardAddCommentModal(
  props: PortfolioCardAddCommentModalProps
) {
  const store = useStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormInputs>();

  const portfolioItem = store.portfolioItems.find(
    (item) => item.id === store.portfolioItemIdSelected
  );

  const onSubmit: SubmitHandler<FormInputs> = async (data) => console.log(data);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalContent>
        <ModalHeader>
          <PortfolioCardTitle
            learn_more_url={portfolioItem?.learn_more_url}
            title={portfolioItem?.title}
          />
          <Heading size="md">Add a Comment</Heading>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Text size="sm">
            Please be respectful and only provide constructive criticism or
            compliments when adding a comment to this portfolio item.
          </Text>

          <form id="add-comment-form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input placeholder="John Doe" type="text" {...register('name')} />
              <FormHelperText>This is optional.</FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Comment</FormLabel>
              <Textarea
                placeholder="This is awesome!"
                required={true}
                {...register('comment')}
              />
            </FormControl>

            <FormControl mt={4}>
              <Checkbox
                colorScheme="primary"
                required={true}
                {...register('disclaimer')}
              >
                I understand that this comment will be reviewed before being
                made public and that it may be removed at any time.
              </Checkbox>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={props.onClose}>
            {i18n.t('close')}
          </Button>

          <Button colorScheme="primary" form="add-comment-form" type="submit">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
