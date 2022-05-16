import pictureService from "../services/pictureService";
import PictureItem from "../components/pictureContainer/pictureItem";
import LoadingIndicator from "../components/common/loadingIndicator";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import useAxios from "../hooks/useAxios";

const PictureContainer = () => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    isFetching,
    isSuccess,
    isFetchingNextPage,
    // isFetchingPreviousPage,
    fetchNextPage,
    // fetchPreviousPage,
    hasNextPage,
    // hasPreviousPage,
  } = pictureService.useCatPictures();

  const downloadCatImage = (fileName: string, filePath: string) => {
    // *1) a태그에 download 넣어주기 ... IE, edge, Safari, Opera는 지원 X
    // let downloadLink = document.createElement("a");
    // downloadLink.setAttribute("href", filePath);
    // downloadLink.setAttribute("download", fileName);
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // document.body.removeChild(downloadLink);

    // *2) axios 사용하기
    // useAxios
    //   .get(`https://cors-anywhere.herokuapp.com/${filePath}`, {
    //     responseType: "blob",
    //   }) // 프록시된 요청에 CORS 헤더 추가 -> 그래도 403 forbidden
    axios
      .get(filePath, {
        responseType: "blob",
      })
      .then((result) => {
        const tempBlob = new Blob([result.data]);
        const downloadUrl = window.URL.createObjectURL(tempBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.setAttribute("download", fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(downloadLink);
      })
      .catch((err) => {
        alert("나중에 시도해 주세요.");
      });
  };

  useEffect(() => {
    fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <div>
      <h2>pictureContainer</h2>
      {isSuccess &&
        data.pages.map((el) => {
          return el.data.map((e, idx) => {
            return (
              <PictureItem
                key={idx}
                data={e}
                downloadCatImage={downloadCatImage}
              />
            );
          });
        })}
      {isFetching && <LoadingIndicator />}
      {error && <div>ERROR!</div>}
      <button ref={ref} onClick={() => fetchNextPage()}>
        {
          isFetchingNextPage
            ? "Loading more..." // isFetchingNextPage === true
            : hasNextPage
            ? "Load Newer" // isFetchingNextPage === false && hasNextPage === true
            : "Nothing more to load" // isFetchingNextPage === false && hasNextPage === false
        }
      </button>
    </div>
  );
};

export default PictureContainer;
