import Head from "next/head";

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props): JSX.Element {
  return (
    <div>
      <Head>
        <title>Hotel result currency</title>
        <meta
          name="description"
          content="Hotel Currencies & Price Competitiveness task"
        />
        <link rel="icon" href="/hotel.png" />
        <link href="/dist/globals.css" rel="stylesheet"></link>
      </Head>

      <main>{props.children}</main>
    </div>
  );
}
