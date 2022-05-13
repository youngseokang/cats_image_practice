import useAxios from "../hooks/useAxios";

const PictureContainer = () => {
  const getCatsImage = async () => {
    const result = await useAxios.get(`/images/search?limit=5`);
    console.log(result);
  };
  return (
    <div>
      pictureContainer
      <button onClick={() => getCatsImage()}>click</button>
    </div>
  );
};

export default PictureContainer;
