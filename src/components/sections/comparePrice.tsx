import { Pane, Table } from "@moai/core";
import { useEffect, useState } from "react";
import { CurrencyType, IPrice } from "../../interface/price.interface";
import { useLocalStorage } from "usehooks-ts";

interface Props {
  price: IPrice;
}

export const getPrice = (value: number, currency: CurrencyType): number => {
  if (
    currency === CurrencyType.USD ||
    currency === CurrencyType.SGD ||
    currency === CurrencyType.CNY
  )
    return Math.round(value);

  const result = Math.round(value);
  return Math.round(result / 100) * 100;
};

export default function ComparePrice(props: Props): JSX.Element {
  const { price } = props;
  const [total, setTotal] = useState<number>();
  const [competitors, setCompetitors] = useState<[string, number][]>();
  const [isOpen, setIsOpen] = useState(false);
  const [currency] = useLocalStorage<CurrencyType>(
    "currency",
    CurrencyType.USD
  );

  useEffect(() => {
    let result: number;
    if (price.taxes_and_fees) {
      const extraFees = price.taxes_and_fees;
      result = price.price + extraFees.tax + extraFees.hotel_fees;
    } else result = price.price;
    result = getPrice(result, currency);
    setTotal(result);

    if (price.competitors) {
      const entries: [string, number][] = Object.entries(price.competitors).map(
        (v) => [v[0], getPrice(v[1], currency)]
      );
      entries.push(["Le hôtel", result]);
      setCompetitors(entries.sort((a, b) => a[1] - b[1]));
    }
  }, [price]);

  return (
    <>
      {total && (
        <div className="w-1/2 p-4 space-y-4">
          <div
            className={[
              "w-full p-4 text-center",
              "uppercase font-bold tracking-widest text-2xl",
            ].join(" ")}
          >
            Compare price
          </div>
          <Pane>
            <div
              className={[
                "w-full select-none text-center",
                "tracking-wider text-xl font-medium",
                "hover:cursor-pointer hover:font-bold",
              ].join(" ")}
              onMouseOver={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              Our offer: {total}
              {price.taxes_and_fees && "*"}
            </div>
            {isOpen && price.taxes_and_fees && (
              <div
                className={[
                  "flex justify-around items-center px-4 pt-2",
                  "tracking-wider text-md",
                ].join(" ")}
              >
                <div>
                  <strong>Price: </strong>
                  {getPrice(price.price, currency)}
                </div>
                <div>
                  <strong>Taxes: </strong>
                  {getPrice(price.taxes_and_fees.tax, currency)}
                </div>
                <div>
                  <strong>Fees: </strong>
                  {getPrice(price.taxes_and_fees.hotel_fees, currency)}
                </div>
              </div>
            )}
          </Pane>
          {competitors ? (
            <div className="border border-orange-700 overflow-auto max-h-96">
              <Table
                columns={[
                  {
                    title: "Ranking",
                    render: (_, index) => index + 1,
                    className: "border-r border-orange-700 text-center",
                  },
                  {
                    title: "Booking site",
                    render: (v) => v[0],
                    className: "border-r border-orange-700 text-center",
                  },
                  {
                    title: "Price",
                    render: (v) => v[1],
                    className: "border-r border-orange-700 text-center",
                  },
                  {
                    title: "When booking with Le hôtel",
                    render: (v) => {
                      const saving = Math.round(total / v[1]);
                      return v[1] > total ? `Save ${saving}%` : "_";
                    },
                    className: "text-center w-56",
                  },
                ]}
                rowKey={(v) => v[0]}
                rows={competitors}
                fill
                rowClassName={(v) =>
                  v[0] === "Le hôtel"
                    ? "bg-yellow-300 font-semibold"
                    : v[1] === competitors[competitors.length - 1][1]
                    ? "bg-red-300 font-semibold"
                    : ""
                }
              />
            </div>
          ) : (
            <div className="text-center text-lg">No competitor found</div>
          )}
          <div className="w-full text-right text-base">(*) Tax-inclusive</div>
        </div>
      )}
    </>
  );
}
