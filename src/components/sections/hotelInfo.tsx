import { IHotel } from "../../interface/hotels.interface";

interface Props {
  details: IHotel;
}

export default function HotelInfo(props: Props): JSX.Element {
  const { details } = props;
  return (
    <div className="w-1/2 space-y-4 mr-8">
      <div className="uppercase font-bold tracking-widest text-center text-2xl w-full">
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
      <div>
        <strong>Description:</strong>
      </div>
      <div dangerouslySetInnerHTML={{ __html: details.description }} />
    </div>
  );
}
