import axios from "axios";

const useAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL as string,
  headers: {
    "x-api-key": process.env.REACT_APP_API_KEY as string,
    Accept: "application/json; charset=UTF-8",
  },
});

export default useAxios;
