import { Icon, toast } from "@moai/core";
import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import HotelItem from "../components/sections/hotelItem";
import { ENDPOINTS } from "../const/api.const";
import { IHotel } from "../interface/hotels.interface";
import { get } from "../utils/fetcher.utils";
import { FaChevronCircleRight } from "react-icons/fa";
import { CurrencyType, IPrice } from "../interface/price.interface";
import { useLocalStorage } from "usehooks-ts";

const Home = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [isShow, setIsShow] = useState(true);
  const [prices, setPrices] = useState<IPrice[]>();
  const [currency] = useLocalStorage<CurrencyType>(
    "currency",
    CurrencyType.USD
  );

  const fetchHotelsInfo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await get(ENDPOINTS.GET.getHotelsInfo);
      setHotels(response.data);
    } catch (error) {
      console.error(error);
      toast(toast.types.failure, "Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHotelPrice = useCallback(async () => {
    if (!currency) return;
    try {
      setLoading(true);
      const response = await get(ENDPOINTS.GET[currency]);
      const pricesResponse: IPrice[] = response.data;
      setPrices(pricesResponse);
    } catch (error) {
      console.error(error);
      toast(toast.types.failure, "Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  }, [currency]);

  useEffect(() => {
    fetchHotelsInfo();
  }, [fetchHotelsInfo]);

  useEffect(() => {
    fetchHotelPrice();
  }, [fetchHotelPrice, currency]);

  useEffect(() => {
    if (!prices) return;
    const hotelIds = prices.map((v) => v.id);
    const ratesAvailable = hotels.filter((v) => hotelIds.includes(v.id));
    const ratesUnavailable = hotels.filter((v) => !hotelIds.includes(v.id));
    setHotels([...ratesAvailable, ...ratesUnavailable]);
  }, [prices]);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : hotels.length > 0 ? (
        <div className="text-red-700 w-full">
          <div className="uppercase font-bold tracking-widest p-4 text-center text-4xl">
            TOKYO
          </div>
          <div
            className="flex flex-nowrap overflow-scroll no-scrollbar scroll-smooth"
            onScrollCapture={() => setIsShow(false)}
          >
            {hotels.map((value) => (
              <HotelItem
                key={value.id}
                data={value}
                price={prices?.find((v) => v.id === value.id)}
                currency={currency}
              />
            ))}
            {isShow && (
              <div
                className={[
                  "absolute top-1/2 right-12 z-10",
                  "flex items-center space-x-2 animate-bounce",
                  "uppercase text-white font-bold",
                ].join(" ")}
              >
                <span>Scroll right</span>
                <Icon component={FaChevronCircleRight} size={32} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full text-red-700 text-center text-lg">Not found</div>
      )}
    </Layout>
  );
};

export default Home;
