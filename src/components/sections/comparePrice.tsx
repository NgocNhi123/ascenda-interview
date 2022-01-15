import { Pane, Table } from "@moai/core";
import { IPrice } from "../../interface/price.interface";

interface Props {
  price: IPrice;
}

export default function ComparePrice(props: Props): JSX.Element {
  return (
    <div className="w-1/2 p-4 space-y-4">
      <div className="uppercase font-bold tracking-widest p-4 text-center text-2xl w-full">
        Compare price
      </div>
      <Pane>
        <div className="flex justify-between">
          <div>Our offer</div>
          <div>Price: {props.price.price}</div>
          <div>Tax: {props.price.taxes_and_fees?.tax}</div>
          <div>Fee: {props.price.taxes_and_fees?.hotel_fees}</div>
        </div>
      </Pane>
      <div className="border border-orange-700 overflow-auto">
        <Table
          columns={[
            {
              title: "Ranking",
              render: (_, index) => index + 1,
              className: "border-r border-orange-700 text-center",
            },
            {
              title: "Booking site",
              render: (r) => "traveloke",
              className: "border-r border-orange-700 text-center",
            },
            {
              title: "Price",
              render: () => "200",
              className: "border-r border-orange-700 text-center",
            },
            {
              title: "Saving",
              render: () => "100",
              className: "text-center",
            },
          ]}
          rowKey={(_, index) => index.toString()}
          rows={[1, 2]}
          fill
          fixed={{ firstColumn: true }}
        />
      </div>
    </div>
  );
}
