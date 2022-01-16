import { Button, Pane, Table } from "@moai/core";
import { useEffect, useState } from "react";
import { CurrencyType, IPrice } from "../../interface/price.interface";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useLocalStorage } from "usehooks-ts";

interface Props {
  price: IPrice;
}

const getPrice = (value: number, currency: CurrencyType): number => {
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
      const entries: [string, number][] = Object.entries(price.competitors);
      entries.push(["Le hôtel", result]);
      setCompetitors(entries.sort((a, b) => a[1] - b[1]));
    }
  }, [price]);

  return (
    <>
      {total && (
        <div className="w-1/2 p-4 space-y-4">
          <div className="uppercase font-bold tracking-widest p-4 text-center text-2xl w-full">
            Compare price
          </div>
          <Pane>
            <Button
              icon={
                price.taxes_and_fees && (isOpen ? FaChevronUp : FaChevronDown)
              }
              iconRight
              onClick={() => setIsOpen(!isOpen)}
              fill
              style={Button.styles.flat}
            >
              <div className="tracking-wider text-xl font-medium">
                Our offer: {total}
              </div>
            </Button>
            {isOpen && price.taxes_and_fees && (
              <div className="tracking-wider text-md flex justify-around items-center px-4 pt-2">
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
          {competitors && (
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
                    render: (v) => v[0],
                    className: "border-r border-orange-700 text-center",
                  },
                  {
                    title: "Price",
                    render: (v) => v[1],
                    className: "border-r border-orange-700 text-center",
                  },
                  {
                    title: "Saving",
                    render: (v) => {
                      const saving = Math.round(total / v[1]);
                      return v[1] > total ? `Save ${saving}%` : "_";
                    },
                    className: "text-center",
                  },
                ]}
                rowKey={(v) => v[0]}
                rows={competitors}
                fill
                rowClassName={(v) =>
                  v[0] === "Le hôtel" ? "bg-yellow-300 font-medium" : ""
                }
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
