import { toastOptions } from '@/configs/global-configs';
import { IGlobalResponseEmpty } from '@/models/common';
import { fetchUserData } from '@/redux/auth/auth-slice';
import { AppDispatch } from '@/redux/store';
import { AuthService } from '@/services/auth-services/auth-services';

import { inputPlaceholderText } from '@/utils/constants/texts';
import { inputValidationText } from '@/utils/constants/validations';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ButtonGroup,
  ModalFooter,
  Textarea,
  // Tooltip,
  Button,
  useDisclosure
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import InstructionModal from './instruction-modal';

interface IFeedbackModal {
  isOpen: boolean;
  onOpenChange: () => void;
}

export interface IFeedbackModalForm {
  feedbackMessage: string;
}

// generatea JSdoc for this component
/**
 * Renders a feedback modal component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Indicates whether the modal is open or not.
 * @param {Function} props.onOpenChange - Callback function to handle open/close state changes.
 * @example <FeedbackModal isOpen={true} onOpenChange={() => {}} />
 * @returns {JSX.Element} The feedback modal component.
 */
function FeedbackModal({ isOpen, onOpenChange }: IFeedbackModal): JSX.Element {
  const { t } = useTranslation();

  /**
   * Represents a feedback modal form.
   */
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<IFeedbackModalForm>({
    mode: 'onChange'
  });

  const dispatch = useDispatch<AppDispatch>();
  const {
    isOpen: instructionIsOpen,
    onOpen: instructionOnOpen,
    onOpenChange: instructionOnOpenChange
  } = useDisclosure();

  /**
   * Handles the form submission for the feedback modal.
   *
   * @param data - The form data containing the feedback message.
   * @returns A Promise that resolves to void.
   * @throws Any error that occurs during the submission process.
   */
  const onSubmit = async (data: IFeedbackModalForm): Promise<void> => {
    try {
      // Send feedback message using the AuthService
      const res: IGlobalResponseEmpty =
        await AuthService.getInstance().sendFeedback({
          feedbackMessage: data.feedbackMessage
        });

      if (res.isSuccess) {
        // Close the feedback modal
        onOpenChange();

        // Fetch updated user data
        dispatch(fetchUserData());

        // Show success toast message
        toast.success(t('yourMessageSentSuccesfully'), toastOptions);
      }
    } catch (error) {
      // Handle any errors that occur during the submission process
      // (e.g., network errors, server errors)
      console.error('Error submitting feedback:', error);
      throw error;
    }
  };

  return (
    <div>
      <Modal
        size="lg"
        isDismissable={false}
        backdrop="opaque"
        className="centerModalOnMobile"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t('suggestionsAndComments')}
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-5"
                >
                  <div className="flex flex-col gap-5  ">
                    <Textarea
                      {...register('feedbackMessage', {
                        required: {
                          value: true,
                          message: inputValidationText('Mesaj')
                        }
                      })}
                      variant="bordered"
                      fullWidth
                      isRequired
                      label={inputPlaceholderText('Mesaj')}
                      classNames={{
                        label: 'text-md font-normal',
                        innerWrapper: ' flex items-center',
                        inputWrapper: [
                          'relative',
                          'w-full',
                          'inline',
                          'inline-flex',
                          'tap-highlight-transparent',
                          'shadow-sm',
                          'min-h-unit-8',
                          'flex-col',
                          'items-start',
                          'justify-center',
                          'gap-0',
                          'border',
                          ' px-3',
                          'py-1',
                          'rounded-md',
                          'data-[hover=true]:border-[#292D32]',
                          'group-data-[focus=true]:border-gray-200',
                          'border-[#292D32]',
                          'transition-background',
                          '!duration-150 ',
                          'transition-colors',
                          '',
                          'motion-reduce:transition-none '
                        ],
                        input: ' font-light '
                      }}
                      minRows={5}
                      rows={5}
                      className="flex-1 "
                      errorMessage={
                        (errors.feedbackMessage &&
                          errors.feedbackMessage?.message) ||
                        ''
                      }
                      isInvalid={Boolean(errors.feedbackMessage)}
                      maxRows={5}
                    />
                  </div>

                  <ButtonGroup>
                    <Button
                      className="w-full"
                      size="md"
                      aria-label="Send Feedback Button"
                      title="Send Feedback Button"
                      isLoading={isSubmitting}
                      variant="bordered"
                      type="submit"
                    >
                      {t('send')}
                    </Button>
                  </ButtonGroup>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  aria-label="Instruction Button"
                  title="Instruction Button"
                  onClick={instructionOnOpen}
                >
                  {t('instructionBTN')}
                </Button>
                <Button
                  title="Close Button"
                  aria-label="Close Button"
                  onPress={onClose}
                >
                  {t('closeBtn')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {instructionIsOpen && (
        <InstructionModal
          onOpenChange={instructionOnOpenChange}
          isOpen={instructionIsOpen}
        />
      )}
    </div>
  );
}

export default FeedbackModal;
