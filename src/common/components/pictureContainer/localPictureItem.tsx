function LocalPictureItem(props: localPictureItemProps) {
  const { data, downloadLocalCatImage } = props;
  return (
    <div className="pictureItem">
      <h3>{data.name}</h3>
      <img alt={data.name} src={data.url} width={400} height={300} />
      <button onClick={() => downloadLocalCatImage(data.name)}>DOWNLOAD</button>
    </div>
  );
}
export default LocalPictureItem;
