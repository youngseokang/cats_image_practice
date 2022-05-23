import { useInfiniteQuery } from "react-query";
import { AxiosError } from "axios";
import useAxios from "../hooks/useAxios";

const useCatPictures = () => {
  // <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey>
  return useInfiniteQuery<useCatPicturesResult, AxiosError>(
    ["get_cat_pictures"],
    async ({ pageParam = 1 }) => {
      const { data } = await useAxios.get(
        `/images/search?page=${pageParam}&limit=10`
      );
      return {
        data,
        nextId: pageParam + 1,
        previousId: Math.max(0, pageParam - 1),
      };
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    }
  );
};

const useDownloadLocalCatImage = async (fileName: string) => {
  const domain = window.location.origin;
  const downloadPath = domain + "/download/image/" + fileName + ".jpg";
  try {
    const { data } = await useAxios.get(downloadPath, { responseType: "blob" });
    const downloadUrl = window.URL.createObjectURL(new Blob([data], { type: data.type }));
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.setAttribute("download", fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    console.log(err);
    alert("나중에 시도해 주세요.");
  }
}

const pictureService = {
  useCatPictures,
  useDownloadLocalCatImage
};

export default pictureService;
