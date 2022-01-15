import { toast } from "@moai/core";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import HotelItem from "../components/sections/hotelItem";
import { ENDPOINTS } from "../const/api.const";
import { IHotel } from "../interface/hotels.interface";
import { get } from "../utils/fetcher.utils";

const Home = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<IHotel[]>([]);

  const fetchHotelsInfo = async () => {
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
  };

  useEffect(() => {
    fetchHotelsInfo();
  }, []);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : hotels.length > 0 ? (
        <div className="text-red-700 w-full">
          <div className="uppercase font-bold tracking-widest p-4 text-center text-4xl">
            TOKYO
          </div>
          <div className="flex flex-nowrap overflow-scroll no-scrollbar">
            {hotels.map((value) => (
              <HotelItem key={value.id} data={value} />
            ))}
          </div>
        </div>
      ) : (
        <div>Not found</div>
      )}
    </Layout>
  );
};

export default Home;
