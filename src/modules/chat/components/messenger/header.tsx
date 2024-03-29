/* eslint-disable no-bitwise */
import VerifyEmail from '@/core/static-components/verify-email';
import {
  setCurrentChatModel,
  setResetChatInner,
  setWaitingForResponse
} from '@/redux/chat/chat-slice';
import { RootState } from '@/redux/store';
import {
  Button,
  Tooltip,
  Tabs,
  Tab,
  PopoverTrigger,
  Popover,
  PopoverContent,
  useDisclosure,
  Progress
} from '@nextui-org/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FcFlashOn } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * @description Renders the header component for the messenger.
 *
 * @returns The JSX element representing the messenger header.
 */
function MessengerHeader() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen: modalIsopen, onOpen, onOpenChange } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);

  const { currentModel, waitingForResponse } = useSelector(
    (state: RootState) => state?.chat
  );
  const { premium, basic } = useSelector(
    (state: RootState) => state?.statisticsCount?.statisticsCount?.data
  );
  const { verified } = useSelector((state: RootState) => state?.user?.user);
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <div className=" pt-1 pb-3 h-[60px] flex" role="banner">
      <div />
      <div
        role={'navigation'}
        className="flex justify-between  items-center container"
      >
        <div className="flex justify-between gap-2 sm:gap-5 items-center  ">
          {(premium || basic) && (
            <div className="flex w-[400px] justify-content-between gap-4">
              <Tooltip
                placement="top-start"
                offset={12}
                content={`${t('general')}: ${basic?.total}, ${t(
                  'used'
                )}: ${basic?.usage}, ${t('rest')}: ${basic?.remainder}`}
              >
                <Progress
                  size="sm"
                  radius="sm"
                  classNames={{
                    base: 'max-w-md',
                    indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
                    label: ' text-[11px]  text-white pr-2',
                    value: 'text-[11px] text-white'
                  }}
                  label={`${t('ordinary')} paket`}
                  value={basic?.remainder}
                  formatOptions={{}}
                  showValueLabel
                  maxValue={basic?.total}
                />
              </Tooltip>
              <Tooltip
                placement="top-start"
                offset={12}
                content={`${t('general')}: ${premium?.total}, ${t(
                  'used'
                )}: ${premium?.usage}, ${t('rest')}: ${premium?.remainder}`}
              >
                <Progress
                  size="sm"
                  radius="sm"
                  classNames={{
                    base: 'max-w-md',
                    indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
                    label: ' text-[11px]  text-white pr-2',
                    value: ' text-[11px] text-white'
                  }}
                  label={`${t('premium')} paket`}
                  value={premium?.remainder}
                  formatOptions={{}}
                  showValueLabel
                  maxValue={premium?.total}
                />
              </Tooltip>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 mr-5">
          <Tabs
            selectedKey={currentModel}
            // @ts-ignore
            onSelectionChange={e => dispatch(setCurrentChatModel(e))}
            size={'sm'}
            color="primary"
            className="mr-5"
            classNames={{
              cursor: ' bg-default-50',
              tabContent: 'group-data-[selected=true]:text-[white]'
            }}
          >
            <Tab
              key="1"
              title={t('ordinary')}
              isDisabled={Boolean(searchParams.get('threadID'))}
            />
            <Tab
              key="2"
              title={
                <span className="flex items-center">
                  {t('premium')}
                  <FcFlashOn size={16} />
                </span>
              }
              isDisabled={
                Boolean(searchParams.get('threadID')) || premium?.total === 0
              }
            />
          </Tabs>

          {!waitingForResponse ? (
            <Tooltip placement="top-start" offset={12} content={t('newChat')}>
              <Button
                size="sm"
                title="New Chat"
                aria-label="New Chat"
                isIconOnly
                className="bg-transparent rounded-full"
                onClick={() => {
                  if (!verified) {
                    onOpen();
                  } else {
                    searchParams.delete('threadID');
                    dispatch(setResetChatInner(Date.now()));
                    navigate('/chat');
                  }
                }}
              >
                <BsFillPlusCircleFill size={24} color="white" />
              </Button>
            </Tooltip>
          ) : (
            <Popover
              isOpen={isOpen}
              onOpenChange={open => setIsOpen(open)}
              placement="bottom"
              offset={6}
            >
              <PopoverTrigger>
                <Button
                  size="sm"
                  isIconOnly
                  className="transparent rounded-full"
                >
                  <BsFillPlusCircleFill size={20} color="white" />
                </Button>
              </PopoverTrigger>

              <PopoverContent>
                <div className="px-1 flex flex-col py-2 gap-2">
                  <p>{t('awaitedResponseText')}</p>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      title="Remove thread from list"
                      aria-label="Remove thread from list"
                      className="bg-black text-white"
                      onClick={() => {
                        if (!verified) {
                          onOpen();
                        } else {
                          searchParams.delete('threadID');
                          dispatch(setWaitingForResponse(false));
                          dispatch(setResetChatInner(Date.now()));
                          navigate('/chat');
                        }
                      }}
                    >
                      {t('yesTxt')}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      title="Close"
                      aria-label="Close"
                      className=" bg-black text-white"
                    >
                      {t('noTxt')}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/**
       * @description Renders the email verification modal. This component displays the email verification modal.
       */}
      {modalIsopen && (
        <VerifyEmail onOpenChange={onOpenChange} isOpen={modalIsopen} />
      )}
    </div>
  );
}

export default MessengerHeader;
