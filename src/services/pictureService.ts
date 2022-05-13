import { useInfiniteQuery } from "react-query";
import { AxiosError } from "axios";
import useAxios from "../hooks/useAxios";

const useCatPictures = () => {
  // <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey>
  return useInfiniteQuery<useCatPicturesResult, AxiosError>(
    ["get_cat_pictures"],
    async ({ pageParam = 1 }) => {
      const { data } = await useAxios.get(
        `/images/search?limit=${pageParam * 5}`
      );
      return {
        data,
        nextId: Math.min(pageParam + 1, 5),
        previousId: Math.max(0, pageParam - 1),
      };
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    }
  );
};

const pictureService = {
  useCatPictures,
};

export default pictureService;
