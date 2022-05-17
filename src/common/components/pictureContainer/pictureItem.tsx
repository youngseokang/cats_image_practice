const PictureItem = (data: pictureItemProps) => {
  const { id, url /* width, height, breeds */ } = data.data;

  return (
    <div className="pictureItem">
      <h3>{id}</h3>
      <img src={url} alt={id} width={400} height={300} />
      <button onClick={() => data.downloadCatImage(id, url)}>DOWNLOAD</button>
    </div>
  );
};

export default PictureItem;
