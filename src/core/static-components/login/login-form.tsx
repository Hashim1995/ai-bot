/* eslint-disable react/no-unstable-nested-components */
import AppHandledInput from '@/components/forms/input/handled-input';
import { ILogin } from '@/models/user';
import { fetchUserData } from '@/redux/auth/auth-slice';
import { AppDispatch } from '@/redux/store';
import {
  AuthService,
  ILoginResponse
} from '@/services/auth-services/auth-services';
import { useTranslation } from 'react-i18next';

// import { dictionary } from '@/utils/constants/dictionary';
import { inputPlaceholderText } from '@/utils/constants/texts';
import { inputValidationText } from '@/utils/constants/validations';
import { Button, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import ForgotPassword from './forgot-password';
import LoginLeftBar from './login-leftbar';

interface ILoginFormProps {
  handleFlip: () => void;
}
/**
 * Represents a login form component.
 *
 * This component renders a login form with email and password inputs,
 * and handles the submission of the form data for user login.
 *
 * @component
 * @param {object} props - The component props.
 * @param {Function} props.handleFlip - The function to handle flipping between login and registration forms.
 * @returns {JSX.Element} The rendered LoginForm component.
 */
function LoginForm({ handleFlip }: ILoginFormProps): JSX.Element {
  const { t } = useTranslation();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm<ILogin>({
    mode: 'onSubmit',
    defaultValues: {}
  });

  const [userToken, setUserToken] = useLocalStorage<any>('userToken', null);
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: ILogin) => {
    try {
      const res: ILoginResponse = await AuthService.getInstance().login(data);
      if (!res) return;
      if (!userToken) setUserToken({ token: res.data.accessToken });
      dispatch(fetchUserData());
      navigate('/chat');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex  flex-col">
      <LoginLeftBar />
      <div className="animate-border  p-[3px] rounded-xl w-   bg-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%]">
        <div className="p-10 gradient-bg h-full  flex-1 flex items-start flex-col	justify-center rounded-xl  ">
          <h4 className=" mb-5 tracking-widest text-sm text-default-400">
            {t('loginAndDiscover')}
          </h4>
          <h3 className="leading-none tracking-widest  mb-5 text-[34px] font-semibold text-white">
            {t('login')}
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-5"
          >
            <div className="flex flex-col gap-3 md:gap-5  ">
              <AppHandledInput
                name="email"
                inputProps={{
                  id: 'email'
                }}
                type="email"
                control={control}
                isInvalid={Boolean(errors.email?.message)}
                errors={errors}
                size="sm"
                className=" w-96"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('email'))
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: `${t('email')} ${t('regexFormatValidatorText')}`
                  }
                }}
                label={inputPlaceholderText(t('email'))}
                required
              />
              <AppHandledInput
                type={showPassword ? 'text' : 'password'}
                name="password"
                inputProps={{
                  id: 'password',
                  endContent: (
                    <button
                      className="focus:outline-none"
                      type="button"
                      aria-label="Show Password"
                      title="Show Password"
                      onClick={() => setShowPassword(z => !z)}
                    >
                      {showPassword ? (
                        <BsEye
                          size={16}
                          className="text-2xl text-default-400 pointer-events-none"
                        />
                      ) : (
                        <BsEyeSlash
                          size={16}
                          className="text-2xl text-default-400 pointer-events-none"
                        />
                      )}
                    </button>
                  )
                }}
                control={control}
                isInvalid={Boolean(errors.password?.message)}
                errors={errors}
                size="sm"
                className="w-96"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('password'))
                  }
                }}
                label={inputPlaceholderText(t('password'))}
                required
              />
              <div className="flex flex-col space-y-5">
                <span className="flex items-center justify-start ">
                  <span
                    aria-hidden
                    onClick={onOpen}
                    className="font-normal  text-sm"
                  >
                    <span
                      className=" text-blue-500   cursor-pointer"
                      aria-hidden
                    >
                      {t('forgetPassword')}
                    </span>
                  </span>
                </span>
              </div>
            </div>
            <Button
              aria-label="Submit Login Form"
              title="Submit Login Form"
              size="sm"
              isLoading={isSubmitting}
              className="w-full  !mt-3 md:mt-5"
              type="submit"
              variant="bordered"
            >
              {t('login')}
            </Button>
            <div className="flex flex-col !my-[8px]  ">
              <div className="flex items-center mb-1">
                <div className="flex-1 border-t-1 border-gray-500" />
                <span
                  aria-hidden
                  onClick={handleFlip}
                  className="font-normal tracking-widest   text-sm mx-3"
                >
                  {t('or')}
                </span>
                <div className="flex-1 border-t-1 border-gray-500" />
              </div>
            </div>
            <div className="flex flex-col !m-0  ">
              <span className="flex items-center justify-center ">
                <span
                  className=" text-blue-500 text-sm    cursor-pointer"
                  aria-hidden
                  onClick={handleFlip}
                >
                  {t('register')}
                </span>
              </span>
            </div>
          </form>
        </div>
        {isOpen && (
          <ForgotPassword onOpenChange={onOpenChange} isOpen={isOpen} />
        )}{' '}
      </div>
    </div>
  );
}

export default LoginForm;
