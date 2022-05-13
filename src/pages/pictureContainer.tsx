import pictureService from "../services/pictureService";
import PictureItem from "../components/pictureContainer/pictureItem";
import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const PictureContainer = () => {
  //   let picturelist = [];
  const { ref, inView } = useInView();

  useEffect(() => {
    fetchNextPage();
  }, [inView]);

  const {
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = pictureService.useCatPictures();

  return (
    <div>
      <h2>pictureContainer</h2>
      {data.data.map((el) => {
        return <PictureItem data={el} />;
      })}
      <button ref={ref}>
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
