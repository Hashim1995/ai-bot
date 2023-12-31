/* eslint-disable react/no-unstable-nested-components */
import AppHandledInput from '@/components/forms/input/handled-input';
import { ILogin } from '@/models/user';
import { fetchUserData } from '@/redux/auth/auth-slice';
import { AppDispatch } from '@/redux/store';
import {
  AuthService,
  ILoginResponse
} from '@/services/auth-services/auth-services';
import { dictionary } from '@/utils/constants/dictionary';
import { inputPlaceholderText } from '@/utils/constants/texts';
import { inputValidationText } from '@/utils/constants/validations';
import { Button, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash, BsEnvelopeFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import ForgotPassword from './forgot-password';
import LoginLeftBar from './login-leftbar';

interface ILoginFormProps {
  handleFlip: () => void;
}
function LoginForm({ handleFlip }: ILoginFormProps) {
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
    <>
      <div className="p-4 py-6 text-white bg-black-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
        <LoginLeftBar />
      </div>
      <div className="p-4 md:p-3 bg-white md:flex-1 flex items-center flex-col	justify-around rounded-lg md:rounded-none">
        <h3 className="leading-none pb-3 md:pb-0 text-3xl font-semibold text-gray-700">
          {dictionary.az.login}
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
              className="text-black w-72"
              rules={{
                required: {
                  value: true,
                  message: inputValidationText(dictionary.az.email)
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: `${dictionary.az.email} ${dictionary.az.regexFormatValidatorText}`
                }
              }}
              placeholder={inputPlaceholderText(dictionary.az.email)}
              required
              IconElement={() => (
                <BsEnvelopeFill
                  size={16}
                  color={errors.email?.message ? '#f31260' : ''}
                  className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                />
              )}
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
              className="text-black w-72"
              rules={{
                required: {
                  value: true,
                  message: inputValidationText(dictionary.az.password)
                }
              }}
              placeholder={inputPlaceholderText(dictionary.az.password)}
              required
              IconElement={() => (
                <BsEnvelopeFill
                  size={16}
                  color={errors.password?.message ? '#f31260' : ''}
                  className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                />
              )}
            />
            <div className="flex flex-col space-y-5">
              <span className="flex items-center justify-center ">
                <span className="h-px bg-gray-400 mr-1 w-10" />
                <span
                  aria-hidden
                  onClick={onOpen}
                  className="font-normal text-black  text-sm"
                >
                  <span className=" text-blue-500   cursor-pointer" aria-hidden>
                    {dictionary.az.forgetPassword}
                  </span>
                </span>
                <span className="h-px bg-gray-400 ml-1 w-10" />
              </span>
            </div>
          </div>
          <Button
            size="sm"
            isLoading={isSubmitting}
            className="w-full !mt-3 md:mt-5 bg-black text-white border"
            type="submit"
          >
            {dictionary.az.login}
          </Button>
        </form>
        <div className="flex flex-col mt-3 md:mt-0 space-y-5">
          <span className="flex items-center justify-center ">
            <span className="h-px bg-gray-400 mr-1 w-10" />
            <span
              aria-hidden
              onClick={handleFlip}
              className="font-normal text-black  text-sm"
            >
              {dictionary.az.or}{' '}
              <span
                className=" text-blue-500   cursor-pointer"
                aria-hidden
                onClick={handleFlip}
              >
                {dictionary.az.register}
              </span>
            </span>
            <span className="h-px bg-gray-400 ml-1 w-10" />
          </span>
        </div>
      </div>
      {isOpen && <ForgotPassword onOpenChange={onOpenChange} isOpen={isOpen} />}{' '}
    </>
  );
}

export default LoginForm;
