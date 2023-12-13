/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { useEffect, useRef, useState } from 'react';
import { Button, Card, Chip } from '@nextui-org/react';
import { SubmitHandler } from 'react-hook-form';
import { IChatForm, ISendMessagePayload } from '@/modules/chat/types';
import { dictionary } from '@/utils/constants/dictionary';
import { TfiFaceSad } from 'react-icons/tfi';

import { BsRecycle } from 'react-icons/bs';
// @ts-ignore
import ScrollToBottom from 'react-scroll-to-bottom';

import { ChatService } from '@/services/chat-services/chat-services';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { setCurrentThreadId } from '@/redux/chat/chat-slice';
import ChatBubble from './chat-bubble/chat-bubble';
import ChatForm from './chat-form';

interface IBubble {
  isClient: boolean;
  message: string;
  isTyping: boolean;
  chatHistoryId: string | null;
  createdTime?: string | Date;
  id?: string;
  question?: string;
  voiceId?: string;
}

function ChatInner() {
  const [bubbleList, setBubbleList] = useState<IBubble[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { currentModel, currentThreadId } = useSelector(
    (state: RootState) => state.chat
  );
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<IChatForm> = async data => {
    setBubbleList(old => [
      ...old,
      {
        isClient: true,
        message: data.message,
        isTyping: false,
        chatHistoryId: currentThreadId || null
      }
    ]);

    setLoading(true);
    const payload: ISendMessagePayload = {
      servicePlan: Number(currentModel),
      question: data.message,
      chatId: currentThreadId || null
    };
    try {
      const res = await ChatService.getInstance().sendMessage(payload);
      if (res.isSuccess) {
        dispatch(setCurrentThreadId(res?.data?.chatHistoryId));

        setSearchParams({ threadID: String(res?.data?.chatHistoryId) });

        setBubbleList(old => [
          ...old,
          {
            message: res?.data?.answer || '',
            isTyping: true,
            chatHistoryId: res?.data?.chatHistoryId,
            createdTime: res?.data?.createdTime,
            id: res?.data?.id,
            question: res?.data?.question,
            isClient: false
          }
        ]);
      }
      setLoading(false);
      setHasError(false);
    } catch (err) {
      setHasError(true);
      setLoading(false);
    }
  };
  const messengerBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    console.log('called');
    if (messengerBoxRef.current) {
      messengerBoxRef?.current?.scrollIntoView({ behavior: 'smooth' });
      messengerBoxRef.current.scrollTop = messengerBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [bubbleList, loading]);

  useEffect(
    () => () => {
      dispatch(setCurrentThreadId(''));
      setBubbleList([]);
    },
    []
  );

  return (
    <div className="flex flex-col gap-2 h-full  ">
      <div style={{ paddingBottom: 160 }} className="h-full">
        <ScrollToBottom
          scrollViewClassName="flex-grow flex-1 p-4 "
          followButtonClassName="hidden"
          className="row-span-8 componentsScrollBar overflow-y-auto h-full"
        >
          {bubbleList?.map((item: IBubble, i) => (
            <ChatBubble
              message={item.message}
              isTyping={item.isTyping}
              // eslint-disable-next-line react/no-array-index-key
              key={i}
            />
          ))}
          {loading && (
            <div className=" flex justify-center mt-2 items-center ">
              <div className="loader bg-black p-2 rounded-full flex space-x-3">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
              </div>
            </div>
          )}
          {hasError && (
            <div className=" flex justify-center mt-2 items-center ">
              <Chip startContent={<TfiFaceSad size={18} />} color="danger">
                Beynim yandı :(
              </Chip>
            </div>
          )}
          {!loading && bubbleList?.length > 0 && (
            <div className="flex justify-center mt-3 items-center w-full">
              <Button
                type="button"
                startContent={
                  <Button
                    type="submit"
                    isIconOnly
                    size="sm"
                    className="bg-black rounded-full"
                  >
                    <BsRecycle size={18} color="white" />
                  </Button>
                }
                size="sm"
                className="bg-black text-white rounded-full pl-[2px]"
              >
                {dictionary.az.regenerate}
              </Button>
            </div>
          )}
        </ScrollToBottom>
      </div>

      <Card className=" flex-shrink-0 h-[120px] sm:h-[150px] row-span-4 absolute w-full bottom-0">
        <ChatForm onSubmit={onSubmit} />
      </Card>
    </div>
  );
}

export default ChatInner;
