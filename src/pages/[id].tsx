import { toast } from "@moai/core";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import ComparePrice from "../components/sections/comparePrice";
import HotelInfo from "../components/sections/hotelInfo";
import { ENDPOINTS } from "../const/api.const";
import { IHotel } from "../interface/hotels.interface";
import { CurrencyType, IPrice } from "../interface/price.interface";
import { get } from "../utils/fetcher.utils";
import { useLocalStorage } from "usehooks-ts";

export default function HotelDetails(): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<IHotel>();
  const [price, setPrice] = useState<IPrice>();
  const [currency] = useLocalStorage<CurrencyType>(
    "currency",
    CurrencyType.USD
  );

  const fetchHotelInfo = useCallback(async () => {
    try {
      setLoading(true);
      const hotelsResponse = await get(ENDPOINTS.GET.getHotelsInfo);
      const details = hotelsResponse.data.find(
        (v: IHotel) => v.id.toString() === router.query.id
      );
      setDetails(details);
    } catch (error) {
      console.error(error);
      toast(toast.types.failure, "Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const fetchHotelPrice = useCallback(async () => {
    if (!currency) return;
    try {
      setLoading(true);
      const pricesResponse = await get(ENDPOINTS.GET[currency]);
      const prices = pricesResponse.data.find(
        (v: IPrice) => v.id.toString() === router.query.id
      );
      setPrice(prices);
    } catch (error) {
      console.error(error);
      toast(toast.types.failure, "Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  }, [currency, router]);

  useEffect(() => {
    if (router.query.id) {
      fetchHotelInfo();
    }
  }, [router, fetchHotelInfo]);

  useEffect(() => {
    if (router.query.id) {
      setPrice(undefined);
      fetchHotelPrice();
    }
  }, [router, currency, fetchHotelPrice]);

  return (
    <Layout>
      {details ? (
        <div className="text-red-700 w-full h-full flex flex-wrap justify-center">
          <div className={price ? "md:w-1/2" : "md:w-2/3"}>
            <HotelInfo details={details} />
          </div>
          {price && <ComparePrice price={price} />}
        </div>
      ) : (
        <div className="w-full text-red-700 text-center text-lg">Not found</div>
      )}
      {loading && <Loading />}
    </Layout>
  );
}
