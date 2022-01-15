import { Select } from "@moai/core";
import Head from "next/head";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { CurrencyType } from "../interface/price.interface";

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props): JSX.Element {
  const [currency, setCurrency] = useLocalStorage<CurrencyType>(
    "currency",
    CurrencyType.USD
  );

  return (
    <div className="h-screen w-screen">
      <Head>
        <title>Hotel result currency</title>
        <meta
          name="description"
          content="Hotel Currencies & Price Competitiveness task"
        />
        <link rel="icon" href="/hotel.png" />
      </Head>

      <div className="w-full flex justify-end items-center px-8 py-4 bg-orange-900 text-orange-200">
        <Link href="/" passHref>
          <div className="uppercase mr-auto text-xl font-bold hover:cursor-pointer select-none">
            le hôtel
          </div>
        </Link>
        <div className="flex items-center space-x-2">
          <div>Currency: </div>
          <Select
            options={[
              { id: "USD", label: "USD", value: "USD" },
              { id: "SGD", label: "SGD", value: "SGD" },
              { id: "CNY", label: "CNY", value: "CNY" },
              { id: "KRW", label: "KRW", value: "KRW" },
            ]}
            value={currency}
            setValue={(v) => {
              setCurrency(v as CurrencyType);
            }}
          />
        </div>
      </div>

      <main className="py-8 px-10 w-full h-5/6">{props.children}</main>
    </div>
  );
}
