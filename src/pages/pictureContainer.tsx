import pictureService from "../services/pictureService";
import PictureItem from "../common/components/pictureContainer/pictureItem";
import LocalPictureItem from "../common/components/pictureContainer/localPictureItem";
import LoadingIndicator from "../common/components/loadingIndicator";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import useAxios from "../hooks/useAxios";
import "../styles/pictureContainer.css";

import test1 from "../common/image/test1.jpg";
import test2 from "../common/image/test2.jpg";
import test3 from "../common/image/test3.jpg";

const PictureContainer = () => {
  const { ref, inView } = useInView();
  const localPictures = [
    {
      name: `test1`,
      url: test1,
    },
    {
      name: `test2`,
      url: test2,
    },
    {
      name: `test3`,
      url: test3,
    },
  ];
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
    // axios
    //   .get(filePath, {
    //     responseType: "blob",
    //   })
    useAxios
      .get(`https://cors-anywhere.herokuapp.com/${filePath}`, {
        responseType: "blob",
      }) // 프록시된 요청에 CORS 헤더 추가 -> 그래도 403 forbidden
      .then((result) => {
        console.log(result); // {... data: Blob{size: .. ,type: 'image/jpeg'}, ...}
        const downloadUrl = window.URL.createObjectURL(
          new Blob([result.data], { type: result.data.type })
        );
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.setAttribute("download", fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        window.URL.revokeObjectURL(downloadUrl);
      })
      .catch((err) => {
        console.log(err);
        alert("나중에 시도해 주세요.");
      });
  };

  const downloadLocalCatImage = (fileName: string) => {
    const domain = window.location.origin;
    const downloadPath = domain + "/download/image/" + fileName + ".jpg";
    axios
      .get(downloadPath, {
        responseType: "blob",
      })
      .then((result) => {
        // console.log(result); // {... data: Blob{size: .. ,type: 'image/jpeg'}, ...}
        // const tempBlob = new Blob([result.data], { type: result.data.type });
        // console.log(tempBlob); // Blob{size: .., type: 'image/jpeg}
        const downloadUrl = window.URL.createObjectURL(
          new Blob([result.data], { type: result.data.type })
        );
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.setAttribute("download", fileName);
        document.body.appendChild(downloadLink);
        console.log();
        downloadLink.click();
        downloadLink.remove();
        window.URL.revokeObjectURL(downloadUrl);
      })
      .catch((err) => {
        console.log(err);
        alert("나중에 시도해 주세요.");
      });
  };

  useEffect(() => {
    fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <div className="pictureContainer">
      <h2>pictureContainer</h2>
      {localPictures.map((pic, idx) => {
        return (
          <LocalPictureItem
            key={idx}
            data={pic}
            downloadLocalCatImage={downloadLocalCatImage}
          />
        );
      })}

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
