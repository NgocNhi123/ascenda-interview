import { IHotel } from "../../interface/hotels.interface";
import { FaStar } from "react-icons/fa";
import { Icon } from "@moai/core";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CurrencyType, IPrice } from "../../interface/price.interface";
import { getPrice } from "./comparePrice";

export const renderStar = (stars: number): React.ReactNode => {
  const result = [];
  for (let i = 0; i < stars; i++)
    result.push(<Icon component={FaStar} key={i} />);
  return result;
};

export const myLoader = (props: { src: string }) => {
  return props.src;
};

interface Props {
  data: IHotel;
  price?: IPrice;
  currency: CurrencyType;
}

export default function HotelItem(props: Props): JSX.Element {
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    if (!props.price) return;
    let result: number;
    if (props.price.taxes_and_fees) {
      const extraFees = props.price.taxes_and_fees;
      result = props.price.price + extraFees.tax + extraFees.hotel_fees;
    } else result = props.price.price;
    result = getPrice(result, props.currency);
    setTotal(result);
  }, [props.price, props.currency]);

  return (
    <div
      className={[
        "p-4 m-2 w-full sm:w-1/2 md:w-1/3 space-y-2 bg-orange-200",
        "flex-shrink-0 flex-grow-0 rounded-md shadow-md",
      ].join(" ")}
    >
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
        unoptimized
        priority
      />
      <div className="flex justify-between">
        <div className="break-words text-lg font-semibold">
          {props.data.name}
        </div>
        <div className="ml-auto text-center pl-2">
          {total ? `$${total}` : "Rates unavailable"}
        </div>
      </div>
      <div className="w-2/3 truncate">{props.data.address}</div>
      <div className="flex justify-end">
        <div className="text-amber-600 mr-auto">
          {renderStar(props.data.stars)}
        </div>
        <Link href={`/${props.data.id}`} passHref>
          <span
            className={[
              "select-none",
              "hover:cursor-pointer hover:text-base",
              "hover:underline hover:underline-offset-2",
            ].join(" ")}
          >
            View details
          </span>
        </Link>
      </div>
    </div>
  );
}
