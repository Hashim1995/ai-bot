/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unstable-nested-components */
import { IUserRegister } from '@/models/user';
import {
  AuthService,
  ILoginResponse,
  IRegisterResponse
} from '@/services/auth-services/auth-services';
import { inputValidationText } from '@/utils/constants/validations';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Tooltip,
  useNavbar
} from '@nextui-org/react';
import { useState } from 'react';
import dayjs from 'dayjs';

import { Controller, useForm } from 'react-hook-form';
import {
  BsEye,
  BsRobot,
  BsCalendarWeekFill,
  BsEnvelopeFill,
  BsFillPersonLinesFill,
  BsFillKeyFill,
  BsFillPersonFill,
  BsEyeSlash
} from 'react-icons/bs';
import { useLocalStorage } from 'usehooks-ts';
import Datepicker from 'tailwind-datepicker-react';
import { inputConfig } from '@/configs/global-configs';
import AppHandledInput from '@/components/forms/input/handled-input';
import { dictionary } from '@/utils/constants/dictionary';
import {
  inputPlaceholderText,
  selectPlaceholderText
} from '@/utils/constants/texts';
import AppHandledSelect from '@/components/forms/select/handled-select';
import {
  convertDateFormat,
  generateOptionListPerNumber
} from '@/utils/functions/functions';
import { genderOptions } from '@/utils/constants/options';
import AppHandledDate from '@/components/forms/date/handled-date';
import { useNavigate } from 'react-router-dom';

interface IRegisterFormProps {
  handleFlip: () => void;
}
function RegisterForm({ handleFlip }: IRegisterFormProps) {
  const {
    handleSubmit,
    watch,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
    control
  } = useForm<IUserRegister>({
    mode: 'onChange',
    defaultValues: {}
  });
  // eslint-disable-next-line no-unused-vars
  const [userToken, setUserToken] = useLocalStorage<any>('userToken', null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: IUserRegister) => {
    console.log(convertDateFormat(String(data.dateOfBirth)), 'xaliq quluzade');

    const payload: IUserRegister = {
      ...data,
      dateOfBirth: convertDateFormat(String(data.dateOfBirth)),
      gender: Number(data.gender)
    };

    try {
      const res: IRegisterResponse = await AuthService.getInstance().register(
        payload
      );
      if (res.isSuccess) {
        navigate('/login');
      }

      // setUserToken(res.data.accessToken);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="p-4 py-6 text-white bg-black-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
        <div className="my-3 text-4xl font-bold tracking-wider text-center">
          <BsRobot className="animate-pulse	" size={68} />
        </div>
        <p className="mt-6 text-sm font-normal text-center text-white md:mt-0">
          With necəsən, gəle, öp, qıdığla the power of K-WD, you can now focus
          only on functionaries for your digital products, while leaving the UI
          design on us!
        </p>

        <p className="mt-6 text-sm text-center text-white">
          Read our{' '}
          <a href="/#" className="underline">
            terms
          </a>{' '}
          and{' '}
          <a href="/#" className="underline">
            conditions
          </a>
        </p>
      </div>

      <div className="p-3 bg-white md:flex-1 flex items-center		flex-col	justify-around">
        <h3 className="leading-none text-2xl font-semibold text-gray-700">
          {dictionary.az.joinUs}
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          <div className="flex flex-col gap-5  ">
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
              name="firstName"
              inputProps={{
                id: 'firstName'
              }}
              type="text"
              className="text-black w-72"
              control={control}
              isInvalid={Boolean(errors.firstName?.message)}
              errors={errors}
              size="sm"
              rules={{
                required: {
                  value: true,
                  message: inputValidationText(dictionary.az.firstName)
                }
              }}
              placeholder={inputPlaceholderText(dictionary.az.firstName)}
              required
              IconElement={() => (
                <BsFillPersonFill
                  size={16}
                  color={errors.firstName?.message ? '#f31260' : ''}
                  className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                />
              )}
            />
            <AppHandledInput
              name="lastName"
              inputProps={{
                id: 'lastName'
              }}
              type="text"
              control={control}
              className="text-black w-72"
              isInvalid={Boolean(errors.lastName?.message)}
              errors={errors}
              size="sm"
              rules={{
                required: {
                  value: true,
                  message: inputValidationText(dictionary.az.lastName)
                }
              }}
              placeholder={inputPlaceholderText(dictionary.az.lastName)}
              required
              IconElement={() => (
                <BsFillPersonFill
                  size={16}
                  color={errors.lastName?.message ? '#f31260' : ''}
                  className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                />
              )}
            />

            <AppHandledDate
              name="dateOfBirth"
              inputProps={{
                id: 'dateOfBirth'
              }}
              control={control}
              className="text-black w-72 relative"
              isInvalid={Boolean(errors.dateOfBirth?.message)}
              errors={errors}
              size="sm"
              rules={{
                required: {
                  value: true,
                  message: inputValidationText(dictionary.az.dateOfBirth)
                }
              }}
              placeholder={inputPlaceholderText(dictionary.az.dateOfBirth)}
              required
              IconElement={() => (
                <BsCalendarWeekFill
                  size={16}
                  color={errors.dateOfBirth?.message ? '#f31260' : ''}
                  className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                />
              )}
            />

            <AppHandledSelect
              name="gender"
              isInvalid={Boolean(errors.gender?.message)}
              control={control}
              placeholder={selectPlaceholderText(dictionary.az.gender)}
              variant="bordered"
              className=" app-select"
              size="sm"
              required
              rules={{
                required: {
                  value: true,
                  message: inputValidationText(dictionary.az.gender)
                }
              }}
              options={genderOptions}
              errors={errors}
              IconElement={() => (
                <BsCalendarWeekFill
                  size={16}
                  color={errors.dateOfBirth?.message ? '#f31260' : ''}
                  className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                />
              )}
            />

            <AppHandledInput
              name="password"
              control={control}
              className="text-black w-72"
              isInvalid={Boolean(errors.password?.message)}
              errors={errors}
              onChangeApp={() => {
                if (watch('password') !== watch('confirmPassword')) {
                  setError('password', {
                    message: `${dictionary.az.confirmPasswordMessage}`
                  });
                  setError('confirmPassword', {
                    message: `${dictionary.az.confirmPasswordMessage}`
                  });
                } else {
                  clearErrors('password');
                  clearErrors('confirmPassword');
                }
              }}
              rules={{
                required: {
                  value: true,
                  message: inputValidationText(dictionary.az.password)
                },
                minLength: {
                  value: 8,
                  message: `${dictionary.az.minLength}`
                },
                validate: {
                  RequireDigit: value =>
                    /[0-9]/.test(value) || `${dictionary.az.minNumber}`,
                  RequireLowercase: value =>
                    /[a-z]/.test(value) || `${dictionary.az.minSmallLetter}`,
                  RequireUppercase: value =>
                    /[A-Z]/.test(value) || `${dictionary.az.minBigLetter}`,
                  RequireSpecialCharacter: value =>
                    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) ||
                    `${dictionary.az.minCharacter}`
                }
              }}
              placeholder={inputPlaceholderText(dictionary.az.password)}
              required
              size="sm"
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
              type={showPassword ? 'text' : 'password'}
              IconElement={() => (
                <BsFillPersonFill
                  size={16}
                  color={errors.password?.message ? '#f31260' : ''}
                  className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                />
              )}
            />

            <AppHandledInput
              name="confirmPassword"
              control={control}
              size="sm"
              className="text-black w-72"
              isInvalid={Boolean(errors.confirmPassword?.message)}
              errors={errors}
              onChangeApp={() => {
                if (watch('password') !== watch('confirmPassword')) {
                  setError('password', {
                    message: `${dictionary.az.confirmPasswordMessage}`
                  });
                  setError('confirmPassword', {
                    message: `${dictionary.az.confirmPasswordMessage}`
                  });
                } else {
                  clearErrors('password');
                  clearErrors('confirmPassword');
                }
              }}
              rules={{
                required: {
                  value: true,
                  message: inputValidationText(dictionary.az.confirmPassword)
                },
                minLength: {
                  value: 8,
                  message: `${dictionary.az.minLength}`
                },
                validate: {
                  RequireDigit: value =>
                    /[0-9]/.test(value) || `${dictionary.az.minNumber}`,
                  RequireLowercase: value =>
                    /[a-z]/.test(value) || `${dictionary.az.minSmallLetter}`,
                  RequireUppercase: value =>
                    /[A-Z]/.test(value) || `${dictionary.az.minBigLetter}`,
                  RequireSpecialCharacter: value =>
                    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) ||
                    `${dictionary.az.minCharacter}`
                }
              }}
              placeholder={inputPlaceholderText(dictionary.az.confirmPassword)}
              required
              inputProps={{
                id: 'confirmPassword',
                endContent: (
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setShowPasswordConfirm(z => !z)}
                  >
                    {showPasswordConfirm ? (
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
              type={showPasswordConfirm ? 'text' : 'password'}
              IconElement={() => (
                <BsFillPersonFill
                  size={16}
                  color={errors.confirmPassword?.message ? '#f31260' : ''}
                  className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                />
              )}
            />
          </div>

          <Button
            size="sm"
            isLoading={isSubmitting}
            className="w-full bg-black text-white border"
            type="submit"
          >
            {dictionary.az.register}
          </Button>
        </form>
        <div className="flex flex-col space-y-5">
          <span className="flex items-center justify-center space-x-2">
            <span className="h-px bg-gray-400 w-10" />
            <span
              aria-hidden
              onClick={handleFlip}
              className="font-normal text-black  text-sm"
            >
              {dictionary.az.or}{' '}
              <span
                className=" text-blue-500 cursor-pointer"
                aria-hidden
                onClick={handleFlip}
              >
                {dictionary.az.login}
              </span>
            </span>
            <span className="h-px bg-gray-400 w-10" />
          </span>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
