import Axios from "axios";

const headers = {
  "Content-Type": "application/json",
  "Accept-Encoding": "gzip,deflate,compress",
};

const AxiosUtils = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 15000,
  headers: headers,
});

export default AxiosUtils;
