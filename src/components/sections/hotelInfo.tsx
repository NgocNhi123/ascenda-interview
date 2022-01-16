import { Icon } from "@moai/core";
import Image from "next/image";
import { useState } from "react";
import { IHotel } from "../../interface/hotels.interface";
import { myLoader } from "./hotelItem";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

interface Props {
  details: IHotel;
}

export default function HotelInfo(props: Props): JSX.Element {
  const { details } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full space-y-4 mr-8">
      <Image
        loader={myLoader}
        src={details.photo}
        alt="hotel image"
        objectFit="cover"
        objectPosition="center"
        width="100%"
        height="50%"
        layout="responsive"
        className="rounded-md"
        unoptimized
        priority
      />
      <div
        className={[
          "text-center w-full",
          "uppercase font-bold tracking-widest text-2xl",
        ].join(" ")}
      >
        {details.name}
      </div>
      <div>
        <strong>Rating: </strong>
        {details.rating}
      </div>
      <div>
        <strong>Address: </strong>
        {details.address}
      </div>
      <button onClick={() => setIsOpen(!isOpen)} className="space-x-2">
        <strong>Description</strong>
        <Icon component={isOpen ? FaChevronUp : FaChevronDown} />
      </button>
      {!isOpen && details.description.length > 500 ? (
        <div
          className="break-words"
          dangerouslySetInnerHTML={{
            __html: details.description.slice(0, 500) + "...",
          }}
        />
      ) : (
        <div
          className="break-words"
          dangerouslySetInnerHTML={{ __html: details.description }}
        />
      )}
    </div>
  );
}
