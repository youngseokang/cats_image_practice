const PictureItem = (data: pictureItemProps) => {
  const { id, url /* width, height, breeds */ } = data.data;

  return (
    <div>
      <h3>{id}</h3>
      <img src={url} width={400} height={300} />
      <button onClick={() => data.downloadCatImage(id, url)}>DOWNLOAD</button>
    </div>
  );
};

export default PictureItem;
