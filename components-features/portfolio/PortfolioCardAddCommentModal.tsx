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
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue
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
    formState: { errors },
    handleSubmit,
    register
  } = useForm<FormInputs>();

  const portfolioItem = store.portfolioItems.find(
    (item) => item.id === store.portfolioItemIdSelected
  );

  /**
   * Component that shows a message indicating that a field is required.
   */
  function RequiredFieldMessage(): JSX.Element {
    return (
      <FormHelperText color={useColorModeValue('red.500', 'red.300')}>
        {i18n.t('this_field_is_required')}
      </FormHelperText>
    );
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="xl">
      {!store.portfolioCardCommentsModalIsOpen && (
        <ModalOverlay
          backdropFilter="blur(10px) saturate(180%)"
          bg={useColorModeValue('rgba(0, 0, 0, 0.1)', 'none')}
        />
      )}

      <ModalContent>
        <ModalHeader>
          <PortfolioCardTitle
            learn_more_url={portfolioItem?.learn_more_url}
            title={portfolioItem?.title}
          />
          <Heading size="md">{i18n.t('add_a_comment')}</Heading>
        </ModalHeader>

        <ModalCloseButton title={i18n.t('close')} />

        <ModalBody>
          <Text size="sm">{i18n.t('add_comment_description')}</Text>

          <form id="add-comment-form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt={4}>
              <FormLabel>{i18n.t('name')}</FormLabel>
              <Input placeholder="John Doe" type="text" {...register('name')} />
              <FormHelperText>{i18n.t('this_is_optional')}</FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>{i18n.t('comment')}</FormLabel>
              <Textarea
                placeholder={i18n.t('comment_input_placeholder')}
                {...register('comment', { required: true })}
              />

              {errors.comment && <RequiredFieldMessage />}
            </FormControl>

            <FormControl mt={4}>
              <Checkbox
                colorScheme="primary"
                {...register('disclaimer', { required: true })}
              >
                {i18n.t('add_comment_disclaimer')}
              </Checkbox>

              {errors.disclaimer && <RequiredFieldMessage />}
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={props.onClose}>
            {i18n.t('close')}
          </Button>

          <Button colorScheme="primary" form="add-comment-form" type="submit">
            {i18n.t('submit')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
