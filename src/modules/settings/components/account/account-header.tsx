import { setState } from '@/models/common';
import { dictionary } from '@/utils/constants/dictionary';
import { Button } from '@nextui-org/react';
import { BsPencilSquare, BsFolderFill } from 'react-icons/bs';

interface IAccountHeaderProps {
  setFieldsIsDisable: setState;
  fieldsIsDisable: boolean;
  isLoading: boolean;
}
function AccountHeader({
  fieldsIsDisable,
  isLoading,
  setFieldsIsDisable
}: IAccountHeaderProps) {
  return (
    <div className="">
      <div className="flex justify-between items-center  bg-black p-2 sm:p-3">
        <h2 className="text-base sm:text-xl text-white font-semibold">
          {dictionary.az.account} {dictionary.az.infos}
        </h2>
        <div className="flex gap-5">
          <Button
            size="sm"
            isIconOnly
            isDisabled={isLoading}
            onClick={() => setFieldsIsDisable(z => !z)}
            className="bg-white rounded-full"
            aria-label="submit"
            type="button"
          >
            <BsPencilSquare
              size={20}
              className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
              color="#292D32"
            />
          </Button>
          {!fieldsIsDisable && (
            <Button
              size="sm"
              isLoading={isLoading}
              isIconOnly
              form="account-form"
              className="bg-white rounded-full"
              aria-label="submit"
              type="submit"
            >
              <BsFolderFill
                size={20}
                className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                color="#292D32"
              />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountHeader;
