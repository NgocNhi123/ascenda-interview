import axios from "axios";

export const post = (url: string, data: any) => {
  return axios.post(url, data);
};
export const get = (url: string, data?: any) => {
  return axios.get(url, data);
};
