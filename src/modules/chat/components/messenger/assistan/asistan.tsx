/* eslint-disable no-unused-vars */
import { IAsistanCard } from '@/modules/chat/types';
import { Card, Image, Divider, CardFooter, Button } from '@nextui-org/react';

interface IAsistanCardProps extends IAsistanCard {
  activeId: number | string;
}

function AsistanCard({
  title,
  img,
  id,
  description,
  activeId
}: IAsistanCardProps) {
  console.log(activeId === id);
  return (
    <div className="group p-1 flex h-18 hover:bg-white transition-all duration-300 ease-in-out cursor-pointer rounded-xl items-center justify-between mb-2 gap-4">
      <Image
        alt="Woman listing to music"
        className="object-contain h-full w-14 sm:w-16 rounded-full"
        src={img || ''}
      />
      <div className="text-white w-full flex h-full justify-between flex-col">
        <h3 className="text-[14px] group-hover:text-black transition-all duration-300 ease-in-out text-left leading-4 mb-1 sm:mb-2">
          {title}
        </h3>
        <p className="text-[10px] group-hover:text-black transition-all duration-300 ease-in-out text-left">
          {description}
        </p>
      </div>
    </div>
  );
}

export default AsistanCard;
