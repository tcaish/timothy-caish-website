import PortfolioCardTitle from '@/components-features/portfolio/PortfolioCardTitle';
import { getHashedIpAddress } from '@/helpers';
import { i18n } from '@/services/localization';
import { addPortfolioItemComment } from '@/services/supabase-database/adders/portfolio_item_comments';
import { hasUserCommentedOnPortfolioItem } from '@/services/supabase-database/getters/portfolio_item_comments';
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
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import React from 'react';
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
  const toast = useToast();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<FormInputs>();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

  /**
   * Handles the form submission.
   * @param data The form data.
   */
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // Handles what happens when there is an error
    function handleError() {
      setIsSubmitting(false);
      toast({
        description: i18n.t('error__adding_comment__desc'),
        isClosable: true,
        status: 'error'
      });
      return;
    }

    if (!store.portfolioItemIdSelected) return;

    setIsSubmitting(true);

    const hashedIpAddress = await getHashedIpAddress();

    // If we couldn't generate the hashed IPV6 address
    if (!hashedIpAddress) handleError();

    const userHasAlreadyMadeComment = await hasUserCommentedOnPortfolioItem(
      hashedIpAddress as string,
      store.portfolioItemIdSelected
    );

    // If there was an error checking if the user has already made a comment
    if (userHasAlreadyMadeComment == null) handleError();
    // If the user has already made a comment
    else if (userHasAlreadyMadeComment) {
      setIsSubmitting(false);
      toast({
        description: i18n.t('error__comment_already_added__desc'),
        isClosable: true,
        status: 'error'
      });
      return;
    }

    const success = await addPortfolioItemComment({
      comment: data.comment,
      hashed_ip: hashedIpAddress as string,
      name: data.name,
      portfolio_item_id: store.portfolioItemIdSelected
    });

    // If there was an error adding the comment
    if (!success) handleError();

    setIsSubmitting(false);
    store.setPortfolioCardCommentsModalIsOpen(false);
    store.setPortfolioCardAddCommentModalIsOpen(false);
    reset();

    toast({
      description: i18n.t('success__comment_added__desc'),
      isClosable: true,
      status: 'success'
    });
  };

  return (
    <Modal
      closeOnOverlayClick={!isSubmitting}
      isOpen={props.isOpen}
      onClose={props.onClose}
      size="xl"
    >
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

        <ModalCloseButton isDisabled={isSubmitting} title={i18n.t('close')} />

        <ModalBody>
          <Text size="sm">{i18n.t('add_comment_description')}</Text>

          <form id="add-comment-form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt={4}>
              <FormLabel>{i18n.t('name')}</FormLabel>
              <Input
                isDisabled={isSubmitting}
                placeholder="John Doe"
                type="text"
                {...register('name')}
              />
              <FormHelperText>{i18n.t('this_is_optional')}</FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>{i18n.t('comment')}</FormLabel>
              <Textarea
                isDisabled={isSubmitting}
                placeholder={i18n.t('comment_input_placeholder')}
                {...register('comment', { required: true })}
              />

              {errors.comment && <RequiredFieldMessage />}
            </FormControl>

            <FormControl mt={4}>
              <Checkbox
                colorScheme="primary"
                isDisabled={isSubmitting}
                {...register('disclaimer', { required: true })}
              >
                {i18n.t('add_comment_disclaimer')}
              </Checkbox>

              {errors.disclaimer && <RequiredFieldMessage />}
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={isSubmitting}
            mr={3}
            onClick={props.onClose}
            variant="ghost"
          >
            {i18n.t('close')}
          </Button>

          <Button
            colorScheme="primary"
            disabled={isSubmitting}
            form="add-comment-form"
            isLoading={isSubmitting}
            type="submit"
          >
            {i18n.t('submit')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
