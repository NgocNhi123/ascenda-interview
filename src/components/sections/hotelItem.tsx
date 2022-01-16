import { IHotel } from "../../interface/hotels.interface";
import { FaStar } from "react-icons/fa";
import { Icon } from "@moai/core";
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  data: IHotel;
}

export const renderStar = (stars: number): React.ReactNode => {
  const result = [];
  for (let i = 0; i < stars; i++)
    result.push(<Icon component={FaStar} key={i} />);
  return result;
};

export const myLoader = (props: { src: string }) => {
  return props.src;
};

export default function HotelItem(props: Props): JSX.Element {
  return (
    <div className="p-4 m-2 sm:w-1/2 md:w-1/3 h-[32rem] flex-shrink-0 flex-grow-0 rounded-md bg-orange-200 shadow-md space-y-3">
      <Image
        loader={myLoader}
        src={props.data.photo}
        alt="hotel image"
        objectFit="cover"
        objectPosition="center"
        width="100%"
        height="80%"
        layout="responsive"
        className="rounded-md"
      />
      <div className="break-words text-lg font-semibold">{props.data.name}</div>
      <div className="break-words w-2/3">{props.data.address}</div>
      <div className="flex justify-end">
        <div className="text-amber-600 mr-auto">
          {renderStar(props.data.stars)}
        </div>
        <Link href={`/${props.data.id}`} passHref>
          <span className="hover:underline hover:underline-offset-2 hover:cursor-pointer select-none">
            View details
          </span>
        </Link>
      </div>
    </div>
  );
}
