import useSWR, { SWRConfiguration, Fetcher } from "swr";
import { IProduct } from "@/types";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  // const { data, error } = useSWR<IProduct[]>(`/api${url}`, fetcher, config);
  const { data, error } = useSWR<IProduct[] | any>(`/api/${url}`, fetcher);

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
