/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unstable-nested-components */
import { IUserRegister } from '@/models/user';
import {
  AuthService,
  ILoginResponse
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
  Tooltip
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
import { IOptions } from 'tailwind-datepicker-react/types/Options';
import { inputConfig } from '@/configs/global-configs';
import AppHandledInput from '@/components/forms/input/handled-input';
import { dictionary } from '@/utils/constants/dictionary';
import { inputPlaceholderText } from '@/utils/constants/texts';
import AppHandledSelect from '@/components/forms/select/handled-select';
import { generateOptionListPerNumber } from '@/utils/functions/functions';

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
  const [show, setShow] = useState<boolean>(false);

  const onSubmit = async (data: IUserRegister) => {
    try {
      const res: ILoginResponse = await AuthService.getInstance().login(data);
      setUserToken(res.data.accessToken);
    } catch (err) {
      console.log(err);
    }
  };

  const options: IOptions = {
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: 'Təmizlə',
    // maxDate: new Date('2023-01-01'),
    theme: {
      background: 'border-1 dark:bg-white border-black',
      todayBtn: '!bg-white !text-black',
      clearBtn: '!bg-white !text-black',
      icons: '',
      text: '!text-black',
      disabledText: 'bg-red',
      input: '',
      inputIcon: '',
      selected: '!bg-black !text-white'
    },
    datepickerClassNames: 'top-12',
    defaultDate: new Date('2022-01-01'),
    language: 'en',
    // disabledDates: [],
    weekDays: ['Be', 'Ça', 'Ç', 'Ca', 'C', 'Ş', 'B'],
    inputNameProp: 'date',
    inputIdProp: 'date',
    inputPlaceholderProp: 'Select Date',
    inputDateFormatProp: {
      formatMatcher: 'basic',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
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
          Bizə qoşul
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
              rules={{
                required: {
                  value: true,
                  message: inputValidationText(dictionary.az.email)
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Düzgün olmayan email adresi'
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
              control={control}
              isInvalid={Boolean(errors.email?.message)}
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
              name="firstName"
              inputProps={{
                id: 'firstName'
              }}
              type="text"
              control={control}
              isInvalid={Boolean(errors.email?.message)}
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

            <Controller
              control={control}
              name="lastName"
              rules={{
                required: {
                  value: true,
                  message: 'Soyad xanası məcburidir'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  placeholder="Soyadınızı daxil edin"
                  variant="bordered"
                  required
                  value={value}
                  size="sm"
                  onChange={onChange}
                  className="text-black  w-72"
                  classNames={inputConfig}
                  errorMessage={errors.lastName?.message || ''}
                  startContent={
                    <BsFillPersonFill
                      size={16}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="dateOfBirth"
              rules={{
                required: {
                  value: true,
                  message: 'Doğum tarixi xanası məcburidir'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Datepicker
                  options={options}
                  show={show}
                  onChange={e => {
                    onChange(dayjs(e).format('YYYY-MM-DD'));
                    console.log(e);
                  }}
                  setShow={() => setShow(z => !z)}
                >
                  <div className="...">
                    <Input
                      type="text"
                      placeholder="Doğum tarixinizi daxil edin"
                      variant="bordered"
                      readOnly
                      onFocus={() => setShow(true)}
                      required
                      value={String(value || '')}
                      size="sm"
                      className="text-black  w-72"
                      classNames={inputConfig}
                      // errorMessage={errors.lastName?.message || ''}
                      startContent={
                        <BsCalendarWeekFill
                          size={16}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                    />
                  </div>
                </Datepicker>
              )}
            />
            <AppHandledSelect
              name=""
              control={control}
              placeholder="Cins seçin"
              variant="bordered"
              className=" h-8"
            />

            {/* <Select
              classNames={{
                mainWrapper: 'h-8 data-[open=true]:border-red-300',
                trigger: [
                  'relative',
                  'w-full',
                  'inline',
                  'h-full',
                  'inline-flex',
                  'tap-highlight-transparent',
                  'shadow-sm',
                  'min-h-unit-8',
                  'flex-col',
                  'data-[open=true]:border-gray-400',
                  'data-[focus=true]:border-gray-400',
                  'items-start',
                  'justify-center',
                  'gap-0',
                  'border',
                  ' px-3',
                  'py-1',
                  'rounded-md',
                  ' h-8',
                  '!duration-150 ',
                  'transition-colors',
                  'motion-reduce:transition-none '
                ]
              }}
              placeholder="Cins seçin"
              variant="bordered"
              // label="Cins seçin"
              className=" h-8 text-black app-select"
              startContent={
                <BsFillPersonLinesFill
                  className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                  size={16}
                />
              }
            >
              <SelectItem key={1} value={1}>
                Kişi
              </SelectItem>
              <SelectItem key={2} value={2}>
                Qadın
              </SelectItem>
            </Select> */}
            <Controller
              control={control}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: inputValidationText('Yeni Şifrə')
                },
                minLength: {
                  value: 8,
                  message: 'Şifrə ən az 8 xarakter olmalıdı'
                },
                validate: {
                  RequireDigit: value =>
                    /[^0-9]/.test(value) || 'Şifrəda ən azı 1 rəqəm olmalıdır ',
                  RequireLowercase: value =>
                    /[a-z]/.test(value) ||
                    'Şifrədə ən az 1 kiçik hərf olmalıdır',
                  RequireUppercase: value =>
                    /[A-Z]/.test(value) ||
                    'Şifrədə ən az 1 böyük hərf olmalıdır  '
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  // label="Password"
                  variant="bordered"
                  required
                  errorMessage={errors.password?.message || ''}
                  value={value}
                  size="sm"
                  onChange={e => {
                    onChange(e);
                    if (watch('password') !== watch('confirmPassword')) {
                      setError('password', {
                        message:
                          'Yeni şifrə və yeni şifrənin təkrarı eyni olmalıdı'
                      });
                      setError('confirmPassword', {
                        message:
                          'Yeni şifrə və yeni şifrənin təkrarı eyni olmalıdı'
                      });
                    } else {
                      clearErrors('password');
                      clearErrors('confirmPassword');
                    }
                  }}
                  className="text-black w-72"
                  classNames={inputConfig}
                  placeholder="Şifrənizi daxil edin"
                  endContent={
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
                  }
                  type={showPassword ? 'text' : 'password'}
                  startContent={
                    <BsFillKeyFill
                      size={16}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
              )}
            />
          </div>
          <Button
            size="sm"
            isLoading={isSubmitting}
            className="w-full  text-white border"
            type="submit"
          >
            Qeydiyyat
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
              və ya{' '}
              <span
                className=" text-blue-500   cursor-pointer"
                aria-hidden
                onClick={handleFlip}
              >
                Daxil ol
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
