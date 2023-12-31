/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { IUserSessions } from '@/models/user';
import {
  //  AppDispatch,
  RootState
} from '@/redux/store';
import { dictionary } from '@/utils/constants/dictionary';
import { Card, Chip, Divider, Skeleton } from '@nextui-org/react';
import { BsAndroid2 } from 'react-icons/bs';
import {
  MdOutlineLaptopMac
  //  MdOutlineLogout
} from 'react-icons/md';
import { TbDeviceIpad } from 'react-icons/tb';
import {
  // useDispatch,
  useSelector
} from 'react-redux';
import { FaWindows, FaLinux, FaApple, FaBlackberry } from 'react-icons/fa';
// import { AuthService } from '@/services/auth-services/auth-services';
// import { IGlobalResponseEmpty } from '@/models/common';
// import { fetchUserData } from '@/redux/auth/auth-slice';
import { useState } from 'react';
import Empty from '@/components/layout/empty';

function Sessions() {
  const { userSessions } = useSelector((state: RootState) => state.user.user);
  // const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const returnDeviceIconByType = (type: number) => {
    switch (type) {
      case 1:
        return (
          <MdOutlineLaptopMac
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            size={35}
          />
        );
      case 2:
        return (
          <FaWindows
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            size={35}
          />
        );
      case 3:
        return (
          <FaLinux
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            size={35}
          />
        );
      case 4:
        return (
          <FaLinux
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            size={35}
          />
        );
      case 5:
        return (
          <FaApple
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            size={35}
          />
        );
      case 6:
        return (
          <FaApple
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            size={35}
          />
        );
      case 7:
        return (
          <FaBlackberry
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            size={35}
          />
        );
      case 8:
        return (
          <BsAndroid2
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            size={35}
          />
        );
      default:
        return (
          <TbDeviceIpad
            className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]"
            size={35}
          />
        );
    }
  };

  // const removeSession = async (id: number) => {
  //   setLoading(true);
  //   try {
  //     const res: IGlobalResponseEmpty =
  //       await AuthService.getInstance().removeSession(id);
  //     if (res.isSuccess) {
  //       dispatch(fetchUserData());
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setLoading(false);
  // };

  return (
    <Card className="rounded-lg sm:rounded-2xl shadow h-full ">
      <div className="flex justify-between items-center xl:mb-4 bg-black p-3">
        <div className="text-base sm:text-xl flex flex-row gap-1 sm:gap-0 text-white font-semibold">
          <p>
            {dictionary.az.active} {dictionary.az.sessions}
          </p>
        </div>
        {/* <Button
          size="sm"
          isIconOnly
          className="bg-white rounded-full"
          aria-label="Filter"
        >
          <BsFillFilterCircleFill
            size={20}
            className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
            color="#292D32"
          />
        </Button> */}
      </div>
      <div className="bg-white  rounded-lg  componentsScrollBar overflow-y-auto xl:py-3 xl:px-6 py-1 px-2">
        {!loading ? (
          <div>
            {userSessions?.length > 0 ? (
              userSessions.map((item: IUserSessions) => (
                <div
                  key={item.id}
                  className=" my-3 border-1 px-2 sm:px-5 py-2 sm:py-3  rounded-xl overflow-hidden "
                >
                  <div className="flex items-center justify-between">
                    <div className="2xl:mr-2 xl:mr-1 mr-2">
                      {' '}
                      {returnDeviceIconByType(item.platformType)}
                    </div>
                    <Divider orientation="vertical" className="h-20" />
                    <div className="flex flex-1 justify-between items-center">
                      <div className="2xl:px-4 px-2">
                        <div className="tracking-wide text-[14px] text-black ">
                          <span className="font-bold"> Sistem: </span>
                          {item.platformName || dictionary.az.empty}
                        </div>
                        <div className="tracking-wide text-[14px] text-black">
                          <span className="font-bold">Brauzer: </span>
                          {item.browserName || dictionary.az.empty}
                        </div>
                        <div className="tracking-wide text-[14px] text-black">
                          <span className="font-bold">IP: </span>
                          {item.ipAddress || dictionary.az.empty}
                        </div>
                        <div className="tracking-wide text-[14px] text-black">
                          <span className="font-bold">Giriş tarixi: </span>
                          {item.loginDate || dictionary.az.empty}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="font-bold 2xl:px-4 px-2">
                          <Chip
                            className="text-white"
                            color={item.status ? 'success' : 'danger'}
                          >
                            {item.status ? 'Aktiv' : item.status}
                          </Chip>
                        </div>
                        {/* <Divider orientation="vertical" className="h-20" />
                        <div className="2xl:ml-2 ml-2">
                          <MdOutlineLogout
                            className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] cursor-pointer"
                            color="red"
                            size={25}
                            aria-hidden
                            onClick={() => {
                              removeSession(item.id);
                            }}
                          />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Empty />
            )}
          </div>
        ) : (
          <div className="max-w-[300px] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default Sessions;
